import { useState } from "react";
import { Text, View } from "react-native";
import { Chip, ChipRow } from "@/components/app-ui";
import { ErrorText, Field, PrimaryButton } from "@/components/auth-ui";
import { MERK, MERK_LIST, TIPE_LABEL } from "@/lib/catalog";
import type { Motor, TipeMotor } from "@/lib/types";

const TIPE_LIST: TipeMotor[] = ["sport", "skuter"];

// Form pilih merk, tipe (sport/skuter), model, dan plat motor.
export function MotorForm({
  onSubmit,
  label = "Simpan motor",
}: {
  onSubmit: (m: Omit<Motor, "id">) => void;
  label?: string;
}) {
  const [merk, setMerk] = useState("");
  const [tipe, setTipe] = useState<TipeMotor | "">("");
  const [model, setModel] = useState("");
  const [plat, setPlat] = useState("");
  const [error, setError] = useState("");

  // Tipe yang tersedia mengikuti merk yang dipilih (Kawasaki tidak punya skuter).
  const tipeTersedia = merk ? TIPE_LIST.filter((t) => MERK[merk][t].length > 0) : [];
  const modelTersedia = merk && tipe ? MERK[merk][tipe] : [];

  function pilihMerk(m: string) {
    setMerk(m);
    setTipe("");
    setModel("");
    setError("");
  }

  function pilihTipe(t: TipeMotor) {
    setTipe(t);
    setModel("");
    setError("");
  }

  function submit() {
    if (!merk) return setError("Pilih merk motor dulu.");
    if (!tipe) return setError("Pilih tipe motor dulu.");
    if (!model) return setError("Pilih model motor dulu.");
    if (!plat.trim()) return setError("Plat nomor masih kosong.");
    onSubmit({ merk, tipe, model, plat: plat.trim().toUpperCase() });
    setMerk("");
    setTipe("");
    setModel("");
    setPlat("");
    setError("");
  }

  return (
    <View className="gap-4">
      <View>
        <Text className="mb-1 text-xs text-[#6B6A63]">Merk</Text>
        <ChipRow>
          {MERK_LIST.map((m) => (
            <Chip key={m} label={m} active={merk === m} onPress={() => pilihMerk(m)} />
          ))}
        </ChipRow>
      </View>

      {merk ? (
        <View>
          <Text className="mb-1 text-xs text-[#6B6A63]">Tipe</Text>
          <ChipRow>
            {tipeTersedia.map((t) => (
              <Chip key={t} label={TIPE_LABEL[t]} active={tipe === t} onPress={() => pilihTipe(t)} />
            ))}
          </ChipRow>
        </View>
      ) : null}

      {tipe ? (
        <View>
          <Text className="mb-1 text-xs text-[#6B6A63]">Model</Text>
          <ChipRow>
            {modelTersedia.map((m) => (
              <Chip
                key={m}
                label={m}
                active={model === m}
                onPress={() => {
                  setModel(m);
                  setError("");
                }}
              />
            ))}
          </ChipRow>
        </View>
      ) : null}

      <Field
        label="Plat nomor"
        value={plat}
        onChangeText={(t) => {
          setPlat(t);
          setError("");
        }}
        autoCapitalize="characters"
        autoCorrect={false}
        placeholder="B 1234 ABC"
      />

      <ErrorText text={error} />
      <PrimaryButton label={label} onPress={submit} busy={false} />
    </View>
  );
}
