"use client"

import { useState } from "react";
import { useRouter } from 'nextjs-toploader/app';
import { Toast } from "@/components/partials/Toast";
import Cookies from "js-cookie";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    adminId: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (form.adminId == process.env.NEXT_PUBLIC_ADMIN_ID && form.password == process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        Cookies.set(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME, form.adminId, { expires: 7 })
        router.push('/dashboard');
      } else {
        Toast("error", 'ID atau Kata Sandi salah!');
      }
    } catch (err) {
      console.log(err);
      Toast("error", "Terjadi masalah, coba lagi nanti");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <input 
          type="text" 
          placeholder="Masukkan ID" 
          className="input-field text-sm"
          required  
          value={form.adminId}
          onChange={(e) => setForm({ ...form, adminId: e.target.value })}  
        />
        <label htmlFor="input-field" className="input-label">
          Masukkan ID
        </label>
        <span className="input-highlight"></span>
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder="Masukkan Kata Sandi"
          className="input-field text-sm"
          required 
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <label htmlFor="input-field" className="input-label">
          Masukkan Kata Sandi
        </label>
        <span className="input-highlight"></span>
      </div>
      <button type="submit" className="text-sm py-3 px-5 text-white bg-slate-800 hover:bg-slate-600 duration-200">
        {!loading ? 'Masuk' : 'Tunggu Sebentar...'}
      </button>
    </form>
  );
}
