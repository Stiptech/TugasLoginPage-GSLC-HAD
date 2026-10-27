import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "@/components/text";
import { router, useLocalSearchParams } from "expo-router";
import {
  AuthScreen,
  ErrorText,
  Field,
  Heading,
  LinkText,
  PasswordField,
  PrimaryButton,
  useToast,
} from "@/components/auth-ui";
import { Icon, KATEGORI_ICON } from "@/components/icons";
import { DEMO_ACCOUNTS, verify } from "@/lib/accounts";
import { BENGKEL, KATEGORI, KATEGORI_LIST } from "@/lib/catalog";
import { useSession } from "@/hooks/use-store";

export default function Login() {
  const { created } = useLocalSearchParams<{ created?: string }>();
  const { show, node } = useToast();
  const { signIn } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (created === "1") {
      show("Akun dibuat. Silakan masuk.", true);
    } else if (created === "unsaved") {
      show(
        "Akun dibuat tapi gagal disimpan. Pakai akun demo: customer@bengkel.id dan customer123."
      );
    }
  }, [created, show]);

  function onSubmit() {
    setError("");
    if (!email.trim()) return setError("Email masih kosong.");
    if (!password) return setError("Kata sandi masih kosong.");

    setBusy(true);

    setTimeout(() => {
      const sesi = verify(email, password);
      setBusy(false);
      if (sesi) {
        setPassword("");

        signIn(sesi);
      } else {
        setError("Email atau kata sandi tidak cocok.");
      }
    }, 700);
  }

  return (
    <View className="flex-1 bg-[#FAF7F0]">
      <AuthScreen>
        <Heading title={BENGKEL.nama} sub="Booking cuci, service, dan modif motormu" />
        <View className="mb-7 flex-row gap-2">
          {KATEGORI_LIST.map((k) => (
            <View
              key={k}
              style={{ backgroundColor: KATEGORI[k].lembut }}
              className="flex-1 items-center rounded-lg py-3"
            >
              <Icon name={KATEGORI_ICON[k]} color={KATEGORI[k].warna} size={20} />
              <Text className="mt-1 text-[11px] text-[#6B6A63]">{KATEGORI[k].pendek}</Text>
            </View>
          ))}
        </View>
        <View className="gap-4">
          <Field
            label="Email"
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              setError("");
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="username"
            placeholder="nama@bengkel.id"
          />
          <PasswordField
            label="Kata sandi"
            value={password}
            onChangeText={(t) => {
              setPassword(t);
              setError("");
            }}
            autoComplete="current-password"
            onSubmitEditing={onSubmit}
            right={
              <LinkText onPress={() => show("Reset kata sandi belum tersambung di demo ini.")}>
                Lupa sandi
              </LinkText>
            }
          />
          <ErrorText text={error} />
          <PrimaryButton label={busy ? "Sedang masuk..." : "Masuk"} onPress={onSubmit} busy={busy} />
        </View>
        <View className="mt-6 rounded-lg border border-[#E3E1D9] bg-white p-3">
          <Text className="mb-2 text-xs text-[#6B6A63]">
            Akun demo. Ketuk salah satu untuk mengisi form.
          </Text>
          {DEMO_ACCOUNTS.map((a) => (
            <Pressable
              key={a.email}
              onPress={() => {
                setEmail(a.email);
                setPassword(a.password);
                setError("");
              }}
              accessibilityRole="button"
              accessibilityLabel={"Isi form dengan " + a.name}
              className="flex-row items-center justify-between rounded-md px-2 py-2 active:bg-[#F4F3EF]"
            >
              <View className="flex-1 pr-2">
                <Text className="text-sm text-[#1F1E1B]">{a.name}</Text>
                <Text className="text-xs text-[#9C9A91]">
                  {a.email} · {a.role === "admin" ? "admin bengkel" : "pelanggan"}
                </Text>
              </View>
              <Text className="text-xs text-[#185FA5] underline">Isi</Text>
            </Pressable>
          ))}
        </View>
        <View className="mt-6 flex-row flex-wrap items-center justify-center gap-1">
          <Text className="text-xs text-[#6B6A63]">Belum punya akun?</Text>
          <LinkText onPress={() => router.push("/register")}>Daftar di sini</LinkText>
        </View>
      </AuthScreen>
      {node}
    </View>
  );
}
