import Navbar from "@/components/layouts/Navbar";
import Form from "@/components/views/home/Form";
import Hero from "@/components/views/home/Hero";

export default function Home() {
  return (
    <>
      <Navbar pageNav='Kirim Laporan'/>
      <main className='pb-20'>
        <Hero/>
        <Form/>
      </main>
    </>
  );
}
