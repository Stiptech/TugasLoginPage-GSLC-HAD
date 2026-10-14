import { Text, View } from "react-native";
import { router } from "expo-router";
import { Chip, ChipRow, Empty, Page, QueueTicket, SectionTitle, ServiceCard } from "@/components/app-ui";
import { KATEGORI_LIST, MERK_LIST } from "@/lib/catalog";
import { useSession, useTickets } from "@/hooks/use-store";

export default function Home() {
  const { session } = useSession();
  const { myTickets } = useTickets();
  const aktif = myTickets.filter((t) => t.status === "menunggu" || t.status === "dikerjakan");

  return (
    <Page title={`Halo, ${session?.name.split(" ")[0] ?? ""}`} sub="Mau ngapain motormu hari ini?">
      <SectionTitle>Booking layanan</SectionTitle>
      <View className="gap-3">
        {KATEGORI_LIST.map((k) => (
          <ServiceCard key={k} kategori={k} onPress={() => router.push(`/booking/${k}`)} />
        ))}
      </View>

      <SectionTitle>Antrian aktif saya</SectionTitle>
      {aktif.length === 0 ? (
        <Empty text="Belum ada antrian aktif. Pilih layanan di atas untuk booking." />
      ) : (
        <View className="gap-3">
          {aktif.map((t) => (
            <QueueTicket key={t.id} tiket={t} onPress={() => router.push(`/tiket/${t.id}`)} />
          ))}
        </View>
      )}

      <SectionTitle>Merk partner bengkel</SectionTitle>
      <ChipRow>
        {MERK_LIST.map((m) => (
          <Chip key={m} label={m} active={false} onPress={() => {}} />
        ))}
      </ChipRow>
      <Text className="mt-2 text-xs text-[#9C9A91]">
        Kami melayani motor sport dan skuter dari merk-merk di atas.
      </Text>
    </Page>
  );
}
