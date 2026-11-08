import { Icon, type IconName } from "@/components/icons";
import { Text } from "@/components/text";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

const TAB: { nama: string; ikon: IconName; ke: "/home" | "/tiket" | "/profil" }[] = [
  { nama: "Beranda", ikon: "home", ke: "/home" },
  { nama: "Tiket", ikon: "ticket", ke: "/tiket" },
  { nama: "Profil", ikon: "user", ke: "/profil" },
];

export function TabBar({ aktif }: { aktif: "/home" | "/tiket" | "/profil" }) {
  return (
    <View className="flex-row border-t border-[#E3E1D9] bg-white pb-5 pt-2">
      {TAB.map((t) => {
        const ini = t.ke === aktif;
        const warna = ini ? "#1F1E1B" : "#9C9A91";
        return (
          <Pressable
            key={t.ke}
            onPress={() => {
              if (!ini) router.replace(t.ke);
            }}
            accessibilityRole="button"
            accessibilityState={{ selected: ini }}
            className="flex-1 items-center gap-1 py-1"
          >
            <Icon name={t.ikon} size={20} color={warna} />
            <Text
              style={{ color: warna }}
              className={"text-[11px] " + (ini ? "font-medium" : "")}
            >
              {t.nama}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
