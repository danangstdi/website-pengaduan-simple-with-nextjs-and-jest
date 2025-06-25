import Logo from '@/../public/img/jalankita-logo.png'
import LoginForm from '@/components/views/login/LoginForm'
import Image from 'next/image'

export default function page() {
  return (
    <>
      <div className='bg-slate-300 absolute inset-0 flex items-center justify-center h-full max-h-full px-10 lg:px-32 xl:px-72'>
        <main className='bg-slate-50 grid md:grid-cols-2 w-full rounded-lg overflow-hidden shadow-xl'>
          <section id='left-side' className='bg-slate-50 p-5 lg:p-10'>
            <Image src={Logo} loading='lazy' alt="Logo JalanKita" className='h-14 w-fit rounded-lg bg-slate-900 p-2'/>
            <h1 className='mt-4 text-xl font-semibold'>Selamat Datang!</h1>
            <LoginForm/>
          </section>
          <section id='right-side' className='hidden bg-auth overflow-hidden md:block'></section>
        </main>
      </div>
    </>
  )
}
