import {
  Card,
  Chip,
  ChipRow,
  Empty,
  IconLine,
  OutlineButton,
  Page,
  SectionTitle,
} from "@/components/app-ui";
import { TabBar } from "@/components/tab-bar";
import { Text } from "@/components/text";
import { useGarage, useSession, useTickets } from "@/hooks/use-store";
import { BENGKEL, TIPE_LABEL } from "@/lib/catalog";
import { View } from "react-native";

export default function Profil() {
  const { session, signOut } = useSession();
  const { garage } = useGarage();
  const { myTickets } = useTickets();

  const selesai = myTickets.filter((t) => t.status === "selesai").length;
  const aktif = myTickets.filter((t) => t.status === "menunggu" || t.status === "dikerjakan").length;

  const inisial = (session?.name ?? "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <View className="flex-1 bg-[#FAF7F0]">
      <Page title="Profile" sub="Data akun dan motor yang tersimpan">
        <Card>
          <View className="flex-row items-center gap-3">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-[#1F1E1B]">
              <Text className="text-lg font-semibold text-white">{inisial}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-[#1F1E1B]">{session?.name}</Text>
              <Text className="text-xs text-[#6B6A63]">{session?.email}</Text>
            </View>
          </View>
        </Card>

        <View className="mt-3 flex-row gap-3">
          <KotakAngka angka={aktif} label="Antrian aktif" />
          <KotakAngka angka={selesai} label="Sudah selesai" />
          <KotakAngka angka={garage.length} label="Motor" />
        </View>

        <SectionTitle>Garasi saya</SectionTitle>
        {garage.length === 0 ? (
          <Empty text="Belum ada motor yang disimpan." />
        ) : (
          <View className="gap-2">
            {garage.map((m) => (
              <Card key={m.id}>
                <View className="flex-row items-center justify-between gap-3">
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-[#1F1E1B]">
                      {m.merk} {m.model}
                    </Text>
                    <Text className="text-xs text-[#6B6A63]">{TIPE_LABEL[m.tipe]}</Text>
                  </View>
                  <View className="rounded border border-[#1F1E1B] px-2 py-0.5">
                    <Text className="text-sm font-plat text-[#1F1E1B]">{m.plat}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        )}

        <SectionTitle>Bengkel</SectionTitle>
        <Card>
          <Text className="text-sm font-semibold text-[#1F1E1B]">{BENGKEL.nama}</Text>
          <View className="mt-1">
            <IconLine icon="home" text={BENGKEL.alamat} />
            <IconLine
              icon="clock"
              text={`Buka ${BENGKEL.buka} - ${BENGKEL.tutup}, ${BENGKEL.libur}`}
            />
            <IconLine icon="list" text={BENGKEL.telepon} />
          </View>
        </Card>

        <SectionTitle>Akun</SectionTitle>
        <ChipRow>
          <Chip label="Ganti kata sandi" active={false} onPress={() => {}} />
          <Chip label="Bantuan" active={false} onPress={() => {}} />
        </ChipRow>

        <View className="mt-5">
          <OutlineButton label="Keluar dari akun" onPress={signOut} danger />
        </View>
      </Page>
      <TabBar aktif="/profile" />
    </View>
  );
}

function KotakAngka({ angka, label }: { angka: number; label: string }) {
  return (
    <View className="flex-1 rounded-xl border border-[#E3E1D9] bg-white px-3 py-3">
      <Text className="text-xl font-semibold text-[#1F1E1B]">{angka}</Text>
      <Text className="mt-0.5 text-[10px] leading-3 text-[#9C9A91]">{label}</Text>
    </View>
  );
}
