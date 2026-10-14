import { Platform } from "react-native";
import { sha256 } from "./sha256";
import type { Role, Session } from "./types";

// Akun dummy bawaan, selalu bisa dipakai login tanpa daftar dulu.
export const DEMO_ACCOUNTS: (Session & { password: string })[] = [
  { name: "Rizky Pratama", email: "customer@bengkel.id", password: "customer123", role: "customer" },
  { name: "Admin Bengkel", email: "admin@bengkel.id", password: "admin12345", role: "admin" },
];
const STORAGE_KEY = "bengkel_demo_accounts";

type Account = { name: string; email: string; role: Role; salt: string; hash: string };

// Di web, akun disimpan di localStorage. Di HP, akun hanya hidup di memori
// selama aplikasi terbuka. Kalau mau awet di HP, pasang AsyncStorage:
//   npx expo install @react-native-async-storage/async-storage
let memory: Account[] = [];

function read(): Account[] {
  if (Platform.OS === "web") {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  }
  return memory;
}

function write(list: Account[]): boolean {
  if (Platform.OS === "web") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return true;
    } catch {
      return false;
    }
  }
  memory = list;
  return true;
}

function randomSalt(): string {
  let out = "";
  for (let i = 0; i < 16; i++) {
    out += Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
  }
  return out;
}

export function emailTaken(email: string): boolean {
  const e = email.trim().toLowerCase();
  if (DEMO_ACCOUNTS.some((d) => d.email === e)) return true;
  return read().some((a) => a.email === e);
}

// true kalau akun berhasil disimpan
export function saveAccount(name: string, email: string, password: string): boolean {
  const salt = randomSalt();
  const list = read();
  list.push({ name, email: email.trim().toLowerCase(), role: "customer", salt, hash: sha256(salt + password) });
  return write(list);
}

// Mengembalikan data sesi kalau email dan password cocok, selain itu null.
export function verify(email: string, password: string): Session | null {
  const e = email.trim().toLowerCase();
  const dummy = DEMO_ACCOUNTS.find((d) => d.email === e);
  if (dummy) {
    return password === dummy.password
      ? { name: dummy.name, email: dummy.email, role: dummy.role }
      : null;
  }

  const akun = read().find((a) => a.email === e);
  if (!akun || sha256(akun.salt + password) !== akun.hash) return null;
  return { name: akun.name, email: akun.email, role: akun.role };
}
