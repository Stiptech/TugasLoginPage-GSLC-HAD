import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  AuthScreen,
  Divider,
  ErrorText,
  Field,
  GoogleButton,
  Heading,
  LinkText,
  PasswordField,
  PrimaryButton,
  useToast,
} from "@/components/auth-ui";
import { DEMO_ACCOUNTS, verify } from "@/lib/accounts";

export default function Login() {
  const { created } = useLocalSearchParams<{ created?: string }>();
  const { show, node } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);

  // Pesan sesudah kembali dari halaman register
  useEffect(() => {
    if (created === "1") {
      show("Account created. You can sign in now.", true);
    } else if (created === "unsaved") {
      show(
        "Account created, but it could not be saved. Sign in with the demo account: sarah@sekolah.sch.id and sekolah123."
      );
    }
  }, [created, show]);

  function onGoogle() {
    setGoogleBusy(true);
    setTimeout(() => {
      setGoogleBusy(false);
      show("Google sign in is not connected in this demo.");
    }, 800);
  }

  function onSubmit() {
    setError("");
    if (!email.trim()) return setError("Email is still empty.");
    if (!password) return setError("Password is still empty.");

    setBusy(true);
    // Jeda singkat supaya terasa seperti proses login sungguhan
    setTimeout(() => {
      const ok = verify(email, password);
      setBusy(false);
      if (ok) {
        setPassword("");
        show("Signed in. This demo has no next page.", true);
      } else {
        setError("Wrong email or password.");
      }
    }, 700);
  }

  return (
    <View className="flex-1 bg-[#FAF7F0]">
      <AuthScreen>
        <Heading title="Class notebook" sub="Sign in with your school account" />

        <GoogleButton label="Sign in with Google" onPress={onGoogle} busy={googleBusy} />
        <Divider />

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
            placeholder="nama@sekolah.sch.id"
          />

          <PasswordField
            label="Password"
            value={password}
            onChangeText={(t) => {
              setPassword(t);
              setError("");
            }}
            autoComplete="current-password"
            onSubmitEditing={onSubmit}
            right={
              <LinkText onPress={() => show("Password reset is not connected in this demo.")}>
                Forgot password?
              </LinkText>
            }
          />

          <ErrorText text={error} />

          <PrimaryButton label={busy ? "Signing in..." : "Sign in"} onPress={onSubmit} busy={busy} />
        </View>

        {/* Akun dummy: ketuk salah satu, email dan password terisi otomatis */}
        <View className="mt-6 rounded-lg border border-[#E3E1D9] bg-white p-3">
          <Text className="mb-2 text-xs text-[#6B6A63]">Demo accounts. Tap one to fill in the form.</Text>
          {DEMO_ACCOUNTS.map((a) => (
            <Pressable
              key={a.email}
              onPress={() => {
                setEmail(a.email);
                setPassword(a.password);
                setError("");
              }}
              accessibilityRole="button"
              accessibilityLabel={"Fill in " + a.name}
              className="flex-row items-center justify-between rounded-md px-2 py-2 active:bg-[#F4F3EF]"
            >
              <View className="flex-1 pr-2">
                <Text className="text-sm text-[#1F1E1B]">{a.name}</Text>
                <Text className="text-xs text-[#9C9A91]">{a.email}</Text>
              </View>
              <Text className="text-xs text-[#185FA5] underline">Fill in</Text>
            </Pressable>
          ))}
        </View>

        <View className="mt-6 flex-row flex-wrap items-center justify-center gap-1">
          <Text className="text-xs text-[#6B6A63]">No account yet?</Text>
          <LinkText onPress={() => router.push("/register")}>Sign up here</LinkText>
        </View>
      </AuthScreen>
      {node}
    </View>
  );
}
