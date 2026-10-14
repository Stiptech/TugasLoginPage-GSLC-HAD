import { Text, View } from "react-native";
import { Empty, OutlineButton, Page, SectionTitle } from "@/components/app-ui";
import { useToast } from "@/components/auth-ui";
import { MotorForm } from "@/components/motor-form";
import { TIPE_LABEL } from "@/lib/catalog";
import { useGarage } from "@/hooks/use-store";

export default function Garasi() {
  const { garage, addMotor, removeMotor } = useGarage();
  const { show, node } = useToast();

  return (
    <View className="flex-1 bg-[#FAF7F0]">
      <Page title="Garasi" sub="Motor yang kamu simpan, tinggal pilih saat booking">
        {garage.length === 0 ? (
          <Empty text="Garasi masih kosong. Tambahkan motormu di bawah." />
        ) : (
          <View className="gap-3">
            {garage.map((m) => (
              <View key={m.id} className="rounded-xl border border-[#E3E1D9] bg-white p-4">
                <Text className="text-base font-semibold text-[#1F1E1B]">
                  {m.merk} {m.model}
                </Text>
                <Text className="mb-3 text-xs text-[#6B6A63]">
                  {TIPE_LABEL[m.tipe]} · {m.plat}
                </Text>
                <OutlineButton
                  label="Hapus dari garasi"
                  danger
                  onPress={() => {
                    removeMotor(m.id);
                    show("Motor dihapus dari garasi.");
                  }}
                />
              </View>
            ))}
          </View>
        )}

        <SectionTitle>Tambah motor</SectionTitle>
        <View className="rounded-xl border border-[#E3E1D9] bg-white p-4">
          <MotorForm
            label="Simpan ke garasi"
            onSubmit={(m) => {
              addMotor(m);
              show("Motor disimpan ke garasi.", true);
            }}
          />
        </View>
      </Page>
      {node}
    </View>
  );
}
