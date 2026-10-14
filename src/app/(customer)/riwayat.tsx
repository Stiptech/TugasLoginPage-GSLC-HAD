import { View } from "react-native";
import { router } from "expo-router";
import { Empty, Page, QueueTicket } from "@/components/app-ui";
import { useTickets } from "@/hooks/use-store";

export default function Riwayat() {
  const { myTickets } = useTickets();

  return (
    <Page title="Riwayat" sub="Semua booking dan nomor antrianmu">
      {myTickets.length === 0 ? (
        <Empty text="Belum ada booking." />
      ) : (
        <View className="gap-3">
          {myTickets.map((t) => (
            <QueueTicket key={t.id} tiket={t} onPress={() => router.push(`/tiket/${t.id}`)} />
          ))}
        </View>
      )}
    </Page>
  );
}
