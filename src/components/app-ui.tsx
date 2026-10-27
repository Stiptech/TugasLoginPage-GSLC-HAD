import type { ReactNode } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Text } from "@/components/text";
import { router } from "expo-router";
import { Icon, KATEGORI_ICON, type IconName } from "@/components/icons";
import { KATEGORI, STATUS, TAHAPAN } from "@/lib/catalog";
import { formatTanggal, nextDays } from "@/lib/date";
import type { Kategori, Motor, Status, Tiket } from "@/lib/types";

export function Page({
  title,
  sub,
  children,
  right,
  back,
}: {
  title: string;
  sub?: string;
  children: ReactNode;
  right?: ReactNode;
  back?: boolean;
}) {
  return (
    <ScrollView
      className="flex-1 bg-[#FAF7F0]"
      contentContainerClassName="px-4 pb-10 pt-14"
      keyboardShouldPersistTaps="handled"
    >
      <View className="mx-auto w-full max-w-lg">
        {back ? (
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Kembali"
            hitSlop={8}
            className="mb-3 -ml-1 h-9 w-9 items-center justify-center rounded-full active:bg-[#EFEDE6]"
          >
            <Icon name="back" size={18} color="#6B6A63" />
          </Pressable>
        ) : null}
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

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <View className={"rounded-xl border border-[#E3E1D9] bg-white p-4 " + className}>{children}</View>
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

export function ServiceBubble({ kategori, onPress }: { kategori: Kategori; onPress: () => void }) {
  const k = KATEGORI[kategori];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={"Booking " + k.label}
      className="flex-1 items-center rounded-xl border border-[#E3E1D9] bg-white px-2 py-4 active:bg-[#F4F3EF]"
    >
      <View
        style={{ backgroundColor: k.lembut }}
        className="mb-2 h-11 w-11 items-center justify-center rounded-full"
      >
        <Icon name={KATEGORI_ICON[kategori]} color={k.warna} size={22} />
      </View>
      <Text className="text-sm font-semibold text-[#1F1E1B]">{k.pendek}</Text>
      <Text className="mt-0.5 text-center text-[10px] leading-3 text-[#9C9A91]">{k.estimasi}</Text>
    </Pressable>
  );
}

export function ServiceCard({ kategori, onPress }: { kategori: Kategori; onPress?: () => void }) {
  const k = KATEGORI[kategori];
  const body = (
    <View className="flex-row items-center gap-3 rounded-xl border border-[#E3E1D9] bg-white p-4">
      <View
        style={{ backgroundColor: k.lembut }}
        className="h-12 w-12 items-center justify-center rounded-lg"
      >
        <Icon name={KATEGORI_ICON[kategori]} color={k.warna} size={24} />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-[#1F1E1B]">{k.label}</Text>
        <Text className="text-xs text-[#6B6A63]">{k.desc}</Text>
      </View>
      {onPress ? <Icon name="chevron" size={16} color="#9C9A91" /> : null}
    </View>
  );
  if (!onPress) return body;
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      {body}
    </Pressable>
  );
}

export function QueueNow({
  kategori,
  sedang,
  menunggu,
}: {
  kategori: Kategori;
  sedang: string | null;
  menunggu: number;
}) {
  const k = KATEGORI[kategori];
  return (
    <View className="flex-1 rounded-xl border border-[#E3E1D9] bg-white px-3 py-3">
      <View className="mb-1.5 flex-row items-center gap-1.5">
        <View style={{ backgroundColor: k.warna }} className="h-1.5 w-1.5 rounded-full" />
        <Text className="text-[11px] text-[#6B6A63]">{k.pendek}</Text>
      </View>
      <Text
        style={{ color: sedang ? k.warna : "#C4C1B7" }}
        className={sedang ? "text-xl font-plat" : "text-base font-medium"}
      >
        {sedang ?? "belum"}
      </Text>
      <Text className="mt-0.5 text-[10px] leading-3 text-[#9C9A91]">
        {menunggu > 0 ? `${menunggu} menunggu` : "antrian kosong"}
      </Text>
    </View>
  );
}

export function Timeline({ status }: { status: Status }) {
  if (status === "batal") {
    return (
      <View className="flex-row items-center gap-2">
        <View className="h-2 w-2 rounded-full bg-[#B23A39]" />
        <Text className="text-sm text-[#B23A39]">Booking dibatalkan</Text>
      </View>
    );
  }
  const urutan: Status[] = ["menunggu", "dikerjakan", "selesai"];
  const kini = urutan.indexOf(status);
  return (
    <View>
      {TAHAPAN.map((t, i) => {
        const lewat = i <= kini;
        const akhir = i === TAHAPAN.length - 1;
        return (
          <View key={t.status} className="flex-row gap-3">
            <View className="items-center pt-1">
              <View
                className={
                  "h-2.5 w-2.5 rounded-full border " +
                  (lewat ? "border-[#1F1E1B] bg-[#1F1E1B]" : "border-[#D6D3C9] bg-white")
                }
              />
              {akhir ? null : (
                <View className={"w-px flex-1 " + (i < kini ? "bg-[#1F1E1B]" : "bg-[#E3E1D9]")} />
              )}
            </View>
            <View className={akhir ? "pb-0" : "pb-5"}>
              <Text
                className={
                  "text-sm " + (lewat ? "font-medium text-[#1F1E1B]" : "text-[#9C9A91]")
                }
              >
                {t.label}
              </Text>
              <Text className="text-xs text-[#9C9A91]">{t.ket}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

export function IconLine({ icon, text }: { icon: IconName; text: string }) {
  return (
    <View className="flex-row items-center gap-2 py-1">
      <Icon name={icon} size={16} color="#9C9A91" />
      <Text className="flex-1 text-xs text-[#6B6A63]">{text}</Text>
    </View>
  );
}

export function motorLabel(m: Motor): string {
  return `${m.merk} ${m.model} · ${m.plat}`;
}

export function QueueTicket({ tiket, onPress }: { tiket: Tiket; onPress?: () => void }) {
  const k = KATEGORI[tiket.kategori];
  const body = (
    <View className="flex-row overflow-hidden rounded-xl border border-[#E3E1D9] bg-white">
      <View style={{ backgroundColor: k.warna }} className="w-24 items-center justify-center py-4">
        <Text className="text-xs text-white/80">Antrian</Text>
        <Text className="text-2xl font-plat text-white">{tiket.nomor}</Text>
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

export function InfoRow({
  label,
  value,
  plat,
}: {
  label: string;
  value: string;
  plat?: boolean;
}) {
  return (
    <View className="flex-row justify-between gap-4 py-2">
      <Text className="text-sm text-[#6B6A63]">{label}</Text>
      <Text
        className={
          "flex-1 text-right text-[#1F1E1B] " + (plat ? "text-base font-plat" : "text-sm")
        }
      >
        {value}
      </Text>
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
