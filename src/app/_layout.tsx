import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StoreProvider, useSession } from "@/hooks/use-store";
import "../../global.css";

function RootNav() {
  const { session } = useSession();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#FAF7F0" },
      }}
    >
      {/* Belum login */}
      <Stack.Protected guard={!session}>
        <Stack.Screen name="index" />
        <Stack.Screen name="register" />
      </Stack.Protected>

      {/* Customer */}
      <Stack.Protected guard={session?.role === "customer"}>
        <Stack.Screen name="(customer)" />
        <Stack.Screen name="booking/[kategori]" />
        <Stack.Screen name="tiket/[id]" />
      </Stack.Protected>

      {/* Admin bengkel */}
      <Stack.Protected guard={session?.role === "admin"}>
        <Stack.Screen name="(admin)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <StoreProvider>
      <StatusBar style="dark" />
      <RootNav />
    </StoreProvider>
  );
}
