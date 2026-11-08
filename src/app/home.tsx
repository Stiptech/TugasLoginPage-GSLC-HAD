import { useMemo } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Text } from "@/components/text";
import {
  Card,
  Chip,
  ChipRow,
  Empty,
  IconLine,
  Page,
  QueueNow,
  QueueTicket,
  SectionTitle,
  ServiceBubble,
} from "@/components/app-ui";
import { useToast } from "@/components/auth-ui";
import { TabBar } from "@/components/tab-bar";
import { BENGKEL, KATEGORI, KATEGORI_LIST, MERK_LIST } from "@/lib/catalog";
import { formatTanggal, today } from "@/lib/date";
import { ringkasAntrian } from "@/lib/queue";
import { useGarage, useSession, useTickets } from "@/hooks/use-store";

export default function Home() {
  const { session } = useSession();
  const { myTickets, tickets } = useTickets();
  const { garage } = useGarage();
  const { show, node } = useToast();

  const hari = today();
  const aktif = myTickets.filter((t) => t.status === "menunggu" || t.status === "dikerjakan");

  const antrian = useMemo(
    () => KATEGORI_LIST.map((k) => ({ k, r: ringkasAntrian(tickets, k, hari) })),
    [tickets, hari]
  );

  const belumAda = (nama: string) => show(`Halaman booking ${nama} belum dibuat di tahap ini.`);

  return (
    <View className="flex-1 bg-[#FAF7F0]">
      <Page
        title={`Halo, ${session?.name.split(" ")[0] ?? ""}`}
        sub="Mau diapain motormu hari ini"
      >
        <View className="flex-row gap-3">
          {KATEGORI_LIST.map((k) => (
            <ServiceBubble
              key={k}
              kategori={k}
              onPress={() => belumAda(KATEGORI[k].pendek.toLowerCase())}
            />
          ))}
        </View>
        <SectionTitle>Antrian bengkel hari ini</SectionTitle>
        <View className="flex-row gap-3">
          {antrian.map(({ k, r }) => (
            <QueueNow key={k} kategori={k} sedang={r.sedang} menunggu={r.menunggu} />
          ))}
        </View>
        <Text className="mt-2 text-xs text-[#9C9A91]">
          Nomor di atas yang sedang dipanggil. {formatTanggal(hari)}.
        </Text>
        <SectionTitle>Antrianmu</SectionTitle>
        {aktif.length === 0 ? (
          <Empty text="Belum ada antrian aktif. Pilih salah satu layanan di atas." />
        ) : (
          <View className="gap-3">
            {aktif.map((t) => (
              <QueueTicket key={t.id} tiket={t} onPress={() => router.replace("/tiket")} />
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
            <IconLine
              icon="bike"
              text={
                garage.length > 0
                  ? `${garage.length} motor tersimpan di garasimu`
                  : "Garasimu masih kosong, simpan motor dulu biar booking cepat"
              }
            />
          </View>
        </Card>
        <SectionTitle>Merk yang dilayani</SectionTitle>
        <ChipRow>
          {MERK_LIST.map((m) => (
            <Chip key={m} label={m} active={false} onPress={() => router.replace("/profil")} />
          ))}
        </ChipRow>
        <Text className="mt-2 text-xs text-[#9C9A91]">
          Motor sport dan skuter dari merk di atas, suku cadangnya ada di tempat.
        </Text>
      </Page>
      <TabBar aktif="/home" />
      {node}
    </View>
  );
}
