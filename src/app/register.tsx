import { useState } from "react";
import { View } from "react-native";
import { Text } from "@/components/text";
import { router } from "expo-router";
import {
  AuthScreen,
  ErrorText,
  Field,
  Heading,
  LinkText,
  PasswordField,
  PrimaryButton,
} from "@/components/auth-ui";
import { emailTaken, saveAccount } from "@/lib/accounts";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function onSubmit() {
    setError("");
    const nama = name.trim();
    const mail = email.trim();

    if (!nama) return setError("Nama lengkap masih kosong.");
    if (!mail) return setError("Email masih kosong.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      return setError("Format email belum benar. Contoh: nama@email.com");
    }
    if (password.length < 8) return setError("Kata sandi minimal delapan huruf.");
    if (emailTaken(mail)) {
      return setError("Email ini sudah terdaftar. Coba masuk, atau pakai email lain.");
    }

    setBusy(true);

    setTimeout(() => {
      const tersimpan = saveAccount(nama, mail, password);
      router.replace({ pathname: "/", params: { created: tersimpan ? "1" : "unsaved" } });
    }, 700);
  }

  const clear = () => setError("");

  return (
    <View className="flex-1 bg-[#FAF7F0]">
      <AuthScreen>
        <Heading
          title="Daftar akun"
          sub="Sesudah daftar, kamu bisa simpan motor di garasi dan langsung ambil nomor antrian."
        />
        <View className="gap-4">
          <Field
            label="Nama lengkap"
            value={name}
            onChangeText={(t) => {
              setName(t);
              clear();
            }}
            autoComplete="name"
            placeholder="Nama yang dipanggil di bengkel"
          />
          <Field
            label="Email"
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              clear();
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            placeholder="nama@email.com"
          />
          <PasswordField
            label="Kata sandi"
            value={password}
            onChangeText={(t) => {
              setPassword(t);
              clear();
            }}
            autoComplete="new-password"
            placeholder="Minimal delapan huruf"
            onSubmitEditing={onSubmit}
          />
          <ErrorText text={error} />
          <PrimaryButton
            label={busy ? "Sedang mendaftar..." : "Daftar"}
            onPress={onSubmit}
            busy={busy}
          />
        </View>
        <View className="mt-6 flex-row flex-wrap items-center justify-center gap-1">
          <Text className="text-xs text-[#6B6A63]">Sudah punya akun.</Text>
          <LinkText onPress={() => router.replace("/")}>Masuk di sini</LinkText>
        </View>
      </AuthScreen>
    </View>
  );
}
