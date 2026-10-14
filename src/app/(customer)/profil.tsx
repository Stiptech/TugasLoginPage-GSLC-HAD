import { View } from "react-native";
import { InfoRow, OutlineButton, Page } from "@/components/app-ui";
import { useSession, useTickets } from "@/hooks/use-store";

export default function Profil() {
  const { session, signOut } = useSession();
  const { myTickets } = useTickets();

  return (
    <Page title="Profil">
      <View className="mb-6 rounded-xl border border-[#E3E1D9] bg-white px-4 py-2">
        <InfoRow label="Nama" value={session?.name ?? "-"} />
        <InfoRow label="Email" value={session?.email ?? "-"} />
        <InfoRow label="Total booking" value={String(myTickets.length)} />
      </View>
      <OutlineButton label="Keluar" danger onPress={signOut} />
    </Page>
  );
}
