import type { ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { KATEGORI, STATUS } from "@/lib/catalog";
import { formatTanggal, nextDays } from "@/lib/date";
import type { Kategori, Motor, Status, Tiket } from "@/lib/types";

/* ---------- Kerangka halaman dengan judul ---------- */
export function Page({
  title,
  sub,
  children,
  right,
}: {
  title: string;
  sub?: string;
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <ScrollView
      className="flex-1 bg-[#FAF7F0]"
      contentContainerClassName="px-4 pb-10 pt-14"
      keyboardShouldPersistTaps="handled"
    >
      <View className="mx-auto w-full max-w-lg">
        <View className="mb-5 flex-row items-start justify-between gap-3">
          <View className="flex-1">
            <Text className="text-2xl font-semibold text-[#1F1E1B]">{title}</Text>
            {sub ? <Text className="mt-1 text-sm text-[#6B6A63]">{sub}</Text> : null}
          </View>
          {right}
        </View>
        {children}
      </View>
    </ScrollView>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <Text className="mb-2 mt-5 text-xs font-medium uppercase text-[#6B6A63]">{children}</Text>;
}

export function Empty({ text }: { text: string }) {
  return (
    <View className="items-center rounded-lg border border-dashed border-[#E3E1D9] px-4 py-8">
      <Text className="text-center text-sm text-[#9C9A91]">{text}</Text>
    </View>
  );
}

/* ---------- Chip pilihan ---------- */
export function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      className={
        "rounded-full border px-3 py-1.5 " +
        (active ? "border-[#1F1E1B] bg-[#1F1E1B]" : "border-[#E3E1D9] bg-white")
      }
    >
      <Text className={"text-sm " + (active ? "text-white" : "text-[#1F1E1B]")}>{label}</Text>
    </Pressable>
  );
}

export function ChipRow({ children }: { children: ReactNode }) {
  return <View className="flex-row flex-wrap gap-2">{children}</View>;
}

/* ---------- Badge status ---------- */
export function StatusBadge({ status }: { status: Status }) {
  const s = STATUS[status];
  return (
    <View style={{ backgroundColor: s.bg }} className="rounded-full px-2.5 py-1">
      <Text style={{ color: s.fg }} className="text-xs font-medium">
        {s.label}
      </Text>
    </View>
  );
}

/* ---------- Kartu layanan di Home ---------- */
export function ServiceCard({ kategori, onPress }: { kategori: Kategori; onPress: () => void }) {
  const k = KATEGORI[kategori];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={"Booking " + k.label}
      className="flex-row items-center gap-3 rounded-xl border border-[#E3E1D9] bg-white p-4 active:bg-[#F4F3EF]"
    >
      <View
        style={{ backgroundColor: k.warna + "1A" }}
        className="h-12 w-12 items-center justify-center rounded-lg"
      >
        <Text className="text-2xl">{k.icon}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-[#1F1E1B]">{k.label}</Text>
        <Text className="text-xs text-[#6B6A63]">{k.desc}</Text>
      </View>
      <Text className="text-lg text-[#9C9A91]">›</Text>
    </Pressable>
  );
}

/* ---------- Teks ringkas motor ---------- */
export function motorLabel(m: Motor): string {
  return `${m.merk} ${m.model} · ${m.plat}`;
}

/* ---------- Tiket antrian ---------- */
export function QueueTicket({ tiket, onPress }: { tiket: Tiket; onPress?: () => void }) {
  const k = KATEGORI[tiket.kategori];
  const body = (
    <View className="flex-row overflow-hidden rounded-xl border border-[#E3E1D9] bg-white">
      <View style={{ backgroundColor: k.warna }} className="w-24 items-center justify-center py-4">
        <Text className="text-xs text-white/80">Antrian</Text>
        <Text className="text-2xl font-bold text-white">{tiket.nomor}</Text>
      </View>
      <View className="flex-1 gap-1 p-3">
        <View className="flex-row items-center justify-between gap-2">
          <Text className="flex-1 text-sm font-semibold text-[#1F1E1B]">{k.label}</Text>
          <StatusBadge status={tiket.status} />
        </View>
        <Text className="text-xs text-[#6B6A63]">{motorLabel(tiket.motor)}</Text>
        <Text className="text-xs text-[#9C9A91]">{formatTanggal(tiket.tanggal)}</Text>
      </View>
    </View>
  );
  if (!onPress) return body;
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      {body}
    </Pressable>
  );
}

/* ---------- Pilih tanggal (7 hari ke depan) ---------- */
export function DatePicker({ value, onChange }: { value: string; onChange: (iso: string) => void }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
      {nextDays(7).map((d) => {
        const active = d.iso === value;
        return (
          <Pressable
            key={d.iso}
            onPress={() => onChange(d.iso)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            className={
              "w-16 items-center rounded-lg border py-2 " +
              (active ? "border-[#1F1E1B] bg-[#1F1E1B]" : "border-[#E3E1D9] bg-white")
            }
          >
            <Text className={"text-xs " + (active ? "text-white/80" : "text-[#6B6A63]")}>
              {d.hari}
            </Text>
            <Text className={"text-lg font-semibold " + (active ? "text-white" : "text-[#1F1E1B]")}>
              {d.tgl}
            </Text>
            <Text className={"text-xs " + (active ? "text-white/80" : "text-[#6B6A63]")}>
              {d.bulan}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

/* ---------- Baris label : isi ---------- */
export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between gap-4 py-2">
      <Text className="text-sm text-[#6B6A63]">{label}</Text>
      <Text className="flex-1 text-right text-sm text-[#1F1E1B]">{value}</Text>
    </View>
  );
}

export function OutlineButton({
  label,
  onPress,
  danger,
}: {
  label: string;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className={
        "items-center rounded-lg border bg-white py-2 " +
        (danger ? "border-[#E24B4A]" : "border-[#E3E1D9]")
      }
    >
      <Text className={"text-sm font-medium " + (danger ? "text-[#E24B4A]" : "text-[#1F1E1B]")}>
        {label}
      </Text>
    </Pressable>
  );
}
