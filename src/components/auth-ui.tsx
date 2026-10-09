import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

// Warna disalin dari halaman login Weekly Plan.
export const C = {
  bg: "#FAF7F0",
  ink: "#1F1E1B",
  muted: "#6B6A63",
  faint: "#9C9A91",
  line: "#E3E1D9",
  blue: "#185FA5",
  red: "#E24B4A",
};

/* ---------- Kerangka halaman ---------- */
export function AuthScreen({ children }: { children: ReactNode }) {
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#FAF7F0]"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="flex-grow justify-center px-4 py-10"
      >
        <View className="w-full max-w-sm self-center">{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export function Heading({ title, sub }: { title: string; sub: string }) {
  return (
    <View className="mb-8">
      <Text className="mb-1 text-2xl font-semibold text-[#1F1E1B]">{title}</Text>
      <Text className="text-sm text-[#6B6A63]">{sub}</Text>
    </View>
  );
}

/* ---------- Tombol Google (belum tersambung di demo ini) ---------- */
export function GoogleButton({
  label,
  onPress,
  busy,
}: {
  label: string;
  onPress: () => void;
  busy: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={busy}
      accessibilityRole="button"
      style={{ opacity: busy ? 0.5 : 1 }}
      className="mb-5 flex-row items-center justify-center gap-2 rounded-lg border border-[#E3E1D9] bg-white py-2.5"
    >
      <Text className="text-base font-bold text-[#185FA5]">G</Text>
      <Text className="text-sm font-medium text-[#1F1E1B]">
        {busy ? "Connecting..." : label}
      </Text>
    </Pressable>
  );
}

export function Divider() {
  return (
    <View className="mb-5 flex-row items-center gap-3">
      <View className="h-px flex-1 bg-[#E3E1D9]" />
      <Text className="text-xs text-[#9C9A91]">or</Text>
      <View className="h-px flex-1 bg-[#E3E1D9]" />
    </View>
  );
}

/* ---------- Kolom isian ---------- */
export function Field({
  label,
  right,
  ...input
}: TextInputProps & { label: string; right?: ReactNode }) {
  const [focus, setFocus] = useState(false);
  return (
    <View>
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-xs text-[#6B6A63]">{label}</Text>
        {right}
      </View>
      <TextInput
        placeholderTextColor={C.faint}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{ borderColor: focus ? C.blue : C.line }}
        className="rounded-lg border bg-white px-3 py-2 text-sm text-[#1F1E1B]"
        {...input}
      />
    </View>
  );
}

export function PasswordField({
  label,
  right,
  ...input
}: TextInputProps & { label: string; right?: ReactNode }) {
  const [focus, setFocus] = useState(false);
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-xs text-[#6B6A63]">{label}</Text>
        {right}
      </View>
      <View
        style={{ borderColor: focus ? C.blue : C.line }}
        className="flex-row items-center rounded-lg border bg-white"
      >
        <TextInput
          secureTextEntry={!visible}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={C.faint}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="flex-1 px-3 py-2 text-sm text-[#1F1E1B]"
          {...input}
        />
        <Pressable
          onPress={() => setVisible((v) => !v)}
          accessibilityRole="button"
          accessibilityLabel={visible ? "Hide password" : "Show password"}
          hitSlop={8}
          className="px-3"
        >
          <Text className="text-xs text-[#9C9A91]">{visible ? "Hide" : "Show"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function ErrorText({ text }: { text: string }) {
  if (!text) return null;
  return (
    <Text accessibilityRole="alert" className="text-sm text-[#E24B4A]">
      {text}
    </Text>
  );
}

export function PrimaryButton({
  label,
  onPress,
  busy,
}: {
  label: string;
  onPress: () => void;
  busy: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={busy}
      accessibilityRole="button"
      style={{ opacity: busy ? 0.5 : 1 }}
      className="items-center rounded-lg bg-[#1F1E1B] py-2"
    >
      <Text className="text-sm font-medium text-white">{label}</Text>
    </Pressable>
  );
}

export function LinkText({ children, onPress }: { children: ReactNode; onPress: () => void }) {
  return (
    <Text
      onPress={onPress}
      accessibilityRole="link"
      className="text-xs text-[#185FA5] underline"
    >
      {children}
    </Text>
  );
}

/* ---------- Pesan singkat di bagian bawah layar ---------- */
export function useToast() {
  const [toast, setToast] = useState<{ text: string; success: boolean } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const show = useCallback((text: string, success = false) => {
    setToast({ text, success });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 5000);
  }, []);

  const node = toast ? (
    <View
      pointerEvents="none"
      className="absolute bottom-6 left-4 right-4 items-center"
    >
      <View
        className={
          "max-w-xs rounded-lg border px-4 py-3 shadow-md " +
          (toast.success ? "border-[#5DCAA5] bg-[#F0F9F5]" : "border-[#E3E1D9] bg-white")
        }
      >
        <Text className={"text-sm " + (toast.success ? "text-[#0F6E56]" : "text-[#1F1E1B]")}>
          {toast.text}
        </Text>
      </View>
    </View>
  ) : null;

  return { show, node };
}
