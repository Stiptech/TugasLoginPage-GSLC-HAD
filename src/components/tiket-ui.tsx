import { View } from "react-native";
import { Text } from "@/components/text";
import { StatusBadge } from "@/components/app-ui";
import { Icon } from "@/components/icons";
import { KATEGORI } from "@/lib/catalog";
import { formatTanggal } from "@/lib/date";
import type { Tiket } from "@/lib/types";

export function TiketStub({ tiket }: { tiket: Tiket }) {
  const k = KATEGORI[tiket.kategori];

  return (
    <View className="overflow-hidden rounded-xl border border-[#E3E1D9] bg-white">
      <View style={{ backgroundColor: k.warna }} className="items-center px-4 py-5">
        <Text className="text-xs text-white/80">Nomor antrian · {k.label}</Text>
        <View className="mt-2 rounded-lg border-2 border-[#1F1E1B] bg-white px-6 py-1">
          <Text className="text-4xl font-plat text-[#1F1E1B]">{tiket.nomor}</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between bg-white px-2">
        <View className="-ml-4 h-6 w-6 rounded-full bg-[#FAF7F0]" />
        <View className="flex-1 flex-row justify-between px-1">
          {Array.from({ length: 18 }).map((_, i) => (
            <View key={i} className="h-px w-2 bg-[#E3E1D9]" />
          ))}
        </View>
        <View className="-mr-4 h-6 w-6 rounded-full bg-[#FAF7F0]" />
      </View>

      <View className="px-4 pb-4">
        <BarisInfo label="Status" nilai={<StatusBadge status={tiket.status} />} />
        <BarisInfo label="Tanggal" teks={formatTanggal(tiket.tanggal)} />
        <BarisInfo label="Motor" teks={`${tiket.motor.merk} ${tiket.motor.model}`} />
        <BarisInfo label="Plat" teks={tiket.motor.plat} plat />
        {tiket.paket ? <BarisInfo label="Paket" teks={tiket.paket} /> : null}
        {tiket.keluhan ? <BarisInfo label="Keluhan" teks={tiket.keluhan} /> : null}
        {tiket.rincian ? <BarisInfo label="Rincian modif" teks={tiket.rincian} /> : null}
      </View>
    </View>
  );
}

function BarisInfo({
  label,
  teks,
  nilai,
  plat,
}: {
  label: string;
  teks?: string;
  nilai?: React.ReactNode;
  plat?: boolean;
}) {
  return (
    <View className="flex-row items-start justify-between gap-4 border-b border-[#F0EEE7] py-3">
      <Text className="text-xs text-[#6B6A63]">{label}</Text>
      {nilai ? (
        nilai
      ) : (
        <Text
          className={
            "flex-1 text-right text-[#1F1E1B] " + (plat ? "text-base font-plat" : "text-xs")
          }
        >
          {teks}
        </Text>
      )}
    </View>
  );
}

export function AntrianDiDepan({ jumlah }: { jumlah: number }) {
  return (
    <View className="flex-row items-center gap-3 rounded-xl border border-[#E3E1D9] bg-white p-4">
      <View className="h-10 w-10 items-center justify-center rounded-full bg-[#E8F2EE]">
        <Icon name="bike" size={20} color="#0F6E56" />
      </View>
      <View className="flex-1">
        <Text className="text-xs text-[#6B6A63]">Antrian di depanmu</Text>
        <Text className="text-lg font-semibold text-[#1F1E1B]">
          {jumlah === 0 ? "Kamu paling depan" : `${jumlah} motor`}
        </Text>
      </View>
    </View>
  );
}
