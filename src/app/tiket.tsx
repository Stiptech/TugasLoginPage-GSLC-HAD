import { useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "@/components/text";
import {
  Card,
  Empty,
  OutlineButton,
  Page,
  QueueTicket,
  SectionTitle,
} from "@/components/app-ui";
import { useToast } from "@/components/auth-ui";
import { TabBar } from "@/components/tab-bar";
import { AntrianDiDepan, TiketStub } from "@/components/tiket-ui";
import { montirUntuk } from "@/lib/catalog";
import { antrianDiDepan } from "@/lib/queue";
import { useTickets } from "@/hooks/use-store";

export default function HalamanTiket() {
  const { tickets, myTickets, cancelTicket } = useTickets();
  const { show, node } = useToast();

  const aktif = useMemo(
    () => myTickets.filter((t) => t.status === "menunggu" || t.status === "dikerjakan"),
    [myTickets]
  );
  const riwayat = useMemo(
    () => myTickets.filter((t) => t.status === "selesai" || t.status === "batal"),
    [myTickets]
  );

  const [dibuka, setDibuka] = useState<string | null>(aktif[0]?.id ?? null);
  const terpilih = aktif.find((t) => t.id === dibuka) ?? aktif[0] ?? null;

  function batalkan() {
    if (!terpilih) return;
    if (terpilih.status !== "menunggu") {
      show("Motor sudah dikerjakan montir, tidak bisa dibatalkan.");
      return;
    }
    cancelTicket(terpilih.id);
    show("Booking dibatalkan.", true);
    setDibuka(null);
  }

  return (
    <View className="flex-1 bg-[#FAF7F0]">
      <Page title="Tiket antrian" sub="Nomor antrianmu di bengkel">
        {terpilih === null ? (
          <Empty text="Belum ada antrian aktif. Pilih layanan di beranda dulu." />
        ) : (
          <View className="gap-3">
            <TiketStub tiket={terpilih} />
            <AntrianDiDepan jumlah={antrianDiDepan(tickets, terpilih)} />
            <Card>
              <Text className="text-xs text-[#6B6A63]">Montir yang menangani</Text>
              <Text className="mt-0.5 text-sm font-semibold text-[#1F1E1B]">
                {montirUntuk(terpilih.id)}
              </Text>
            </Card>
            <OutlineButton label="Batalkan booking" onPress={batalkan} danger />
          </View>
        )}

        {aktif.length > 1 ? (
          <>
            <SectionTitle>Antrian aktif lainnya</SectionTitle>
            <View className="gap-2">
              {aktif
                .filter((t) => t.id !== terpilih?.id)
                .map((t) => (
                  <Pressable key={t.id} onPress={() => setDibuka(t.id)} accessibilityRole="button">
                    <QueueTicket tiket={t} />
                  </Pressable>
                ))}
            </View>
          </>
        ) : null}

        <SectionTitle>Riwayat</SectionTitle>
        {riwayat.length === 0 ? (
          <Empty text="Riwayat booking masih kosong." />
        ) : (
          <View className="gap-2">
            {riwayat.map((t) => (
              <QueueTicket key={t.id} tiket={t} />
            ))}
          </View>
        )}
      </Page>
      <TabBar aktif="/tiket" />
      {node}
    </View>
  );
}
