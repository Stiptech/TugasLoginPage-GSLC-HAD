import { useState } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
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
import { emailTaken, saveAccount } from "@/lib/accounts";

export default function Register() {
  const { show, node } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);

  function onGoogle() {
    setGoogleBusy(true);
    setTimeout(() => {
      setGoogleBusy(false);
      show("Google sign in is not connected in this demo.");
    }, 800);
  }

  function onSubmit() {
    setError("");
    const nameValue = name.trim();
    const emailValue = email.trim();

    if (!nameValue) return setError("Full name is still empty.");
    if (!emailValue) return setError("Email is still empty.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      return setError("That email format is not right. Example: name@school.sch.id");
    }
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (emailTaken(emailValue)) {
      return setError("This email is already registered. Try signing in, or use another email.");
    }

    setBusy(true);
    // Jeda singkat supaya terasa seperti proses daftar sungguhan
    setTimeout(() => {
      const saved = saveAccount(nameValue, emailValue, password);
      // Sesudah daftar, kembali ke halaman login.
      router.replace({ pathname: "/", params: { created: saved ? "1" : "unsaved" } });
    }, 700);
  }

  const clear = () => setError("");

  return (
    <View className="flex-1 bg-[#FAF7F0]">
      <AuthScreen>
        <Heading
          title="Create account"
          sub="After you sign up, an admin will set the classes and subjects you teach."
        />

        <GoogleButton label="Sign up with Google" onPress={onGoogle} busy={googleBusy} />
        <Divider />

        <View className="gap-4">
          <Field
            label="Full name"
            value={name}
            onChangeText={(t) => {
              setName(t);
              clear();
            }}
            autoComplete="name"
            placeholder="The name shown in the class table"
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
            placeholder="nama@sekolah.sch.id"
          />

          <PasswordField
            label="Password"
            value={password}
            onChangeText={(t) => {
              setPassword(t);
              clear();
            }}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            onSubmitEditing={onSubmit}
          />

          <ErrorText text={error} />

          <PrimaryButton label={busy ? "Signing up..." : "Sign up"} onPress={onSubmit} busy={busy} />
        </View>

        <View className="mt-6 flex-row flex-wrap items-center justify-center gap-1">
          <Text className="text-xs text-[#6B6A63]">Already have an account?</Text>
          <LinkText onPress={() => router.replace("/")}>Sign in here</LinkText>
        </View>
      </AuthScreen>
      {node}
    </View>
  );
}
