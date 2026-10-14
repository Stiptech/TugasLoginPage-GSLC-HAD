import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { KATEGORI } from "@/lib/catalog";
import { today } from "@/lib/date";
import type { Kategori, Motor, Session, Status, Tiket } from "@/lib/types";

// Semua data disimpan di memori (hilang saat aplikasi ditutup).
// Saat backend siap, cukup ganti isi fungsi di provider ini dengan panggilan API.

export type BookingInput = {
  kategori: Kategori;
  tanggal: string;
  motor: Motor;
  paket?: string;
  keluhan?: string;
  rincian?: string;
  jenisModif?: string[];
};

type Store = {
  session: Session | null;
  signIn: (s: Session) => void;
  signOut: () => void;
  tickets: Tiket[]; // semua tiket (dipakai admin)
  myTickets: Tiket[];
  createTicket: (input: BookingInput) => Tiket;
  setStatus: (id: string, status: Status) => void;
  cancelTicket: (id: string) => void;
  garage: Motor[];
  addMotor: (m: Omit<Motor, "id">) => Motor;
  removeMotor: (id: string) => void;
};

const Ctx = createContext<Store | null>(null);

let seq = 100;
const newId = () => `${Date.now().toString(36)}-${(seq++).toString(36)}`;

// Nomor antrian: prefix kategori + urutan per kategori per tanggal.
// Tiket batal tetap dihitung supaya nomor tidak dipakai ulang.
export function nextQueueNumber(tickets: Tiket[], kategori: Kategori, tanggal: string): string {
  const n = tickets.filter((t) => t.kategori === kategori && t.tanggal === tanggal).length + 1;
  return `${KATEGORI[kategori].prefix}-${String(n).padStart(3, "0")}`;
}

const DEMO_EMAIL = "customer@bengkel.id";

function seedGarage(): Record<string, Motor[]> {
  return {
    [DEMO_EMAIL]: [
      { id: "m-demo-1", merk: "Yamaha", tipe: "sport", model: "R25", plat: "B 4321 XYZ" },
      { id: "m-demo-2", merk: "Honda", tipe: "skuter", model: "Scoopy", plat: "B 1234 ABC" },
    ],
  };
}

// Beberapa tiket pelanggan lain supaya dashboard admin tidak kosong.
function seedTickets(): Tiket[] {
  const t = today();
  const base = { tanggal: t, dibuat: Date.now() - 3_600_000 };
  return [
    {
      ...base,
      id: "seed-1",
      nomor: "C-001",
      kategori: "cuci",
      status: "dikerjakan",
      paket: "Cuci Keseluruhan",
      userEmail: "dewi@contoh.id",
      userName: "Dewi Lestari",
      motor: { id: "s1", merk: "Honda", tipe: "skuter", model: "PCX 160", plat: "D 8812 KA" },
    },
    {
      ...base,
      id: "seed-2",
      nomor: "S-001",
      kategori: "service",
      status: "menunggu",
      keluhan: "Mesin kasar saat digas, ada bunyi tek-tek.",
      userEmail: "andi@contoh.id",
      userName: "Andi Saputra",
      motor: { id: "s2", merk: "Kawasaki", tipe: "sport", model: "Ninja 250", plat: "B 5521 TRX" },
    },
    {
      ...base,
      id: "seed-3",
      nomor: "M-001",
      kategori: "modif",
      status: "menunggu",
      rincian: "Ganti knalpot racing dan velg 17 inci warna hitam.",
      jenisModif: ["Knalpot", "Velg & Ban"],
      userEmail: "bima@contoh.id",
      userName: "Bima Aditya",
      motor: { id: "s3", merk: "Yamaha", tipe: "sport", model: "R15", plat: "F 3090 MB" },
    },
  ];
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [tickets, setTickets] = useState<Tiket[]>(seedTickets);
  const [garages, setGarages] = useState<Record<string, Motor[]>>(seedGarage);

  const email = session?.email ?? "";

  const createTicket = useCallback(
    (input: BookingInput): Tiket => {
      if (!session) throw new Error("Belum login");
      const created: Tiket = {
        ...input,
        id: newId(),
        nomor: nextQueueNumber(tickets, input.kategori, input.tanggal),
        status: "menunggu",
        userEmail: session.email,
        userName: session.name,
        dibuat: Date.now(),
      };
      setTickets([...tickets, created]);
      return created;
    },
    [session, tickets]
  );

  const value = useMemo<Store>(
    () => ({
      session,
      signIn: setSession,
      signOut: () => setSession(null),
      tickets,
      myTickets: tickets
        .filter((t) => t.userEmail === email)
        .sort((a, b) => b.dibuat - a.dibuat),
      createTicket,
      setStatus: (id, status) =>
        setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t))),
      cancelTicket: (id) =>
        setTickets((prev) =>
          prev.map((t) => (t.id === id && t.status === "menunggu" ? { ...t, status: "batal" } : t))
        ),
      garage: garages[email] ?? [],
      addMotor: (m) => {
        const motor = { ...m, id: newId() };
        setGarages((prev) => ({ ...prev, [email]: [...(prev[email] ?? []), motor] }));
        return motor;
      },
      removeMotor: (id) =>
        setGarages((prev) => ({ ...prev, [email]: (prev[email] ?? []).filter((m) => m.id !== id) })),
    }),
    [session, tickets, garages, email, createTicket]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error("StoreProvider belum dipasang");
  return s;
}

export function useSession() {
  const { session, signIn, signOut } = useStore();
  return { session, signIn, signOut };
}

export function useTickets() {
  const { tickets, myTickets, createTicket, setStatus, cancelTicket } = useStore();
  return { tickets, myTickets, createTicket, setStatus, cancelTicket };
}

export function useGarage() {
  const { garage, addMotor, removeMotor } = useStore();
  return { garage, addMotor, removeMotor };
}
