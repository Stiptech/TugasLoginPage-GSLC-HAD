import { useState } from "react";
import { View } from "react-native";
import { Text } from "@/components/text";
import { router } from "expo-router";
import {
  AuthScreen,
  Field,
  Heading,
  LinkText,
  PasswordField,
  PrimaryButton,
} from "@/components/auth-ui";
import { emailTaken, saveAccount } from "@/lib/accounts";
import { adaError, validasiDaftar, type ErrorForm } from "@/lib/validasi";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ErrorForm>({});
  const [busy, setBusy] = useState(false);

  function onSubmit() {
    const nama = name.trim();
    const mail = email.trim();

    const hasil = validasiDaftar(nama, mail, password);

    if (!hasil.email && emailTaken(mail)) {
      hasil.email = "Email ini sudah terdaftar. Coba masuk, atau pakai email lain.";
    }

    setErrors(hasil);
    if (adaError(hasil)) return;

    setBusy(true);

    setTimeout(() => {
      const tersimpan = saveAccount(nama, mail, password);
      router.replace({ pathname: "/", params: { created: tersimpan ? "1" : "unsaved" } });
    }, 700);
  }

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
              setErrors({ ...errors, nama: undefined });
            }}
            error={errors.nama}
            autoComplete="name"
            placeholder="Nama yang dipanggil di bengkel"
          />
          <Field
            label="Email"
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              setErrors({ ...errors, email: undefined });
            }}
            error={errors.email}
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
              setErrors({ ...errors, password: undefined });
            }}
            error={errors.password}
            autoComplete="new-password"
            placeholder="Minimal 8 karakter, ada huruf dan angka"
            onSubmitEditing={onSubmit}
          />
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
