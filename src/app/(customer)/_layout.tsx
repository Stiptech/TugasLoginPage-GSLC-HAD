import { Tabs } from "expo-router";
import { Text } from "react-native";

function icon(emoji: string) {
  return function TabIcon({ focused }: { focused: boolean }) {
    return <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>;
  };
}

export default function CustomerTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1F1E1B",
        tabBarInactiveTintColor: "#9C9A91",
        tabBarStyle: { backgroundColor: "#FFFFFF", borderTopColor: "#E3E1D9" },
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Beranda", tabBarIcon: icon("🏠") }} />
      <Tabs.Screen name="riwayat" options={{ title: "Riwayat", tabBarIcon: icon("🎫") }} />
      <Tabs.Screen name="garasi" options={{ title: "Garasi", tabBarIcon: icon("🏍️") }} />
      <Tabs.Screen name="profil" options={{ title: "Profil", tabBarIcon: icon("👤") }} />
    </Tabs>
  );
}
