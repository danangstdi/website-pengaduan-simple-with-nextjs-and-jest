"use client"

import { Toast } from "@/components/partials/Toast";
import { useState } from "react";

export default function Form() {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    nim: "",
    name: "",
    phone: "",
    title: "",
    detail: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = {
      nim: form.nim,
      name: form.name,
      phone: "62" + form.phone,
      title: form.title,
      detail: form.detail,
    };

    try {
      setUploading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });

      const body = await res.json();
      if (res.ok) {
        Toast("success", "Berhasil mengirim laporan, kami akan segera meninjau laporan anda.");
        setForm({
          nim: "",
          name: "",
          phone: "",
          title: "",
          detail: "",
        })
      } else {
        console.log(`error: ${body.message}`);
        Toast("error", body.message);
      }
    } catch (err) {
        console.log("Gagal submit!");
        Toast("error", "Terjadi masalah, laporan gagal dikirim");
    } finally {
        setUploading(false);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="form-container bg-slate-50 rounded-2xl shadow-lg -mt-28 mx-4 p-4 flex flex-col gap-3 md:-mt-10 md:mx-32 md:shadow-2xl lg:mx-56 lg:py-6 lg:px-8 xl:mx-72">
          <div className="text-slate-800 p-3 font-semibold text-center">
            Lengkapi semua form
          </div>
          <input
            type="text"
            placeholder="Masukkan NIM Anda"
            required
            value={form.nim}
            onChange={(e) => setForm({ ...form, nim: e.target.value })}
            className="p-3 border border-gray-400 bg-transparent text-sm"
          />

          <input
            type="text"
            placeholder="Masukkan Nama Lengkap"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 border border-gray-400 bg-transparent text-sm"
          />

          <div className="grid grid-cols-12">
            <div className="col-span-2 md:col-span-1 p-3 text-sm border-l border-y border-gray-400 bg-gray-100 text-gray-500 flex justify-center items-center">
              +62
            </div>
            <input
              type="number"
              placeholder="Masukkan Nomor Whatsapp"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="col-span-10 md:col-span-11 p-3 border border-gray-400 bg-transparent text-sm"
            />
          </div>

          <input
            type="text"
            placeholder="Masukkan Judul Laporan"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="p-3 border border-gray-400 bg-transparent text-sm"
          />

          <textarea
            rows="6"
            placeholder="Tambahkan detail laporan"
            className="p-3 border border-gray-400 bg-transparent text-sm"
            value={form.detail}
            onChange={(e) => setForm({ ...form, detail: e.target.value })}
          ></textarea>

          <button type="submit" className="py-4 text-white bg-slate-800 hover:bg-slate-600 duration-200 text-sm">
            {!uploading ? "KIRIM LAPORAN" : "TUNGGU SEBENTAR..."}
          </button>
        </div>
      </form>
    </section>
  );
}
