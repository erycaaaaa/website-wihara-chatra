"use client";
import { useState } from "react";
import { Button } from "../../Component/ui/button";
import { formatIDR } from "@/lib/currency";

const FUNDS = [
  { key: "operasional", label: "Dana Operasional" },
  { key: "makan", label: "Dana Makan" },
  { key: "pelita", label: "Dana Pelita" },
  { key: "pembangunan", label: "Dana Pembangunan" }
] as const;

export default function Page(){
  const [amount, setAmount] = useState(100000);
  const [fund, setFund] = useState<typeof FUNDS[number]["key"]>("operasional");

  return (
    <form className="max-w-md space-y-4" onSubmit={(e)=>{e.preventDefault(); alert(`Simulasi donasi: ${fund} - ${formatIDR(amount)}`)}}>
      <h1 className="text-2xl font-semibold">Donasi</h1>

      <label className="block text-sm font-medium">Pilih Dana</label>
      <select value={fund} onChange={(e)=> setFund(e.target.value as unknown as typeof FUNDS[number]["key"])} className="w-full rounded-xl border p-2">
        {FUNDS.map(f => <option key={f.key} value={f.key}>{f.label}</option>)}
      </select>

      <label className="block text-sm font-medium">Nominal</label>
      <input type="number" min={10000} value={amount} onChange={(e)=> setAmount(parseInt(e.target.value||"0",10))} className="w-full rounded-xl border p-2" />

      <Button type="submit">Lanjutkan (Simulasi)</Button>
      <p className="text-xs opacity-70">* Integrasi Midtrans/Xendit via stub.</p>
    </form>
  )
}
