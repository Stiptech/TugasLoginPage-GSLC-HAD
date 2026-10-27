import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { BarlowCondensed_600SemiBold } from "@expo-google-fonts/barlow-condensed/600SemiBold";
import { BarlowCondensed_700Bold } from "@expo-google-fonts/barlow-condensed/700Bold";
import { PlusJakartaSans_400Regular } from "@expo-google-fonts/plus-jakarta-sans/400Regular";
import { PlusJakartaSans_500Medium } from "@expo-google-fonts/plus-jakarta-sans/500Medium";
import { PlusJakartaSans_600SemiBold } from "@expo-google-fonts/plus-jakarta-sans/600SemiBold";
import { PlusJakartaSans_700Bold } from "@expo-google-fonts/plus-jakarta-sans/700Bold";
import { StoreProvider, useSession } from "@/hooks/use-store";
import "../../global.css";

// Splash ditahan sampai font selesai dimuat, supaya teks tidak sempat
// tampil dengan font sistem lalu berkedip ganti.
SplashScreen.preventAutoHideAsync().catch(() => {});

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

      {/* Sudah login. Di branch ini cuma ada beranda, tanpa peduli perannya. */}
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="home" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  // Nama keluarga di sini harus sama persis dengan yang dipakai
  // tailwind.config.js. Satu berkas font = satu ketebalan.
  const [siap, error] = useFonts({
    Jakarta: PlusJakartaSans_400Regular,
    JakartaMedium: PlusJakartaSans_500Medium,
    JakartaSemiBold: PlusJakartaSans_600SemiBold,
    JakartaBold: PlusJakartaSans_700Bold,
    PlatSemiBold: BarlowCondensed_600SemiBold,
    PlatBold: BarlowCondensed_700Bold,
  });

  useEffect(() => {
    // Kalau font gagal dimuat, aplikasi tetap jalan dengan font sistem
    // daripada berhenti di splash selamanya.
    if (siap || error) SplashScreen.hideAsync().catch(() => {});
  }, [siap, error]);

  if (!siap && !error) return null;

  return (
    <StoreProvider>
      <StatusBar style="dark" />
      <RootNav />
    </StoreProvider>
  );
}
