"use client"

import { useState } from 'react'
import Image from 'next/image'
import Logo from '@/../public/img/jalankita-logo.png'
import Link from 'next/link'
import Swal from "sweetalert2";
import { Toast } from '../partials/Toast'
import Cookies from 'js-cookie'
import { useRouter } from 'nextjs-toploader/app';

export default function DashboardNav(props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const session = Cookies.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME);

  const listMenu = [
    {link: '/dashboard', text: 'Dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-houses-fill" viewBox="0 0 16 16"><path d="M7.207 1a1 1 0 0 0-1.414 0L.146 6.646a.5.5 0 0 0 .708.708L1 7.207V12.5A1.5 1.5 0 0 0 2.5 14h.55a2.5 2.5 0 0 1-.05-.5V9.415a1.5 1.5 0 0 1-.56-2.475l5.353-5.354z"/><path d="M8.793 2a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708z"/></svg>},
  ]

  const handleLogout = async () => {
    Swal.fire({
      title: "Yakin ingin keluar ?",
      showDenyButton: true,
      confirmButtonText: "Yakin",
      denyButtonText: `Batalkan`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Cookies.remove(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME)
          router.push('/');
        } catch (error) {
          console.error("Error logging out:", error);
          Toast("error", "Gagal melakukan logout. Silakan coba lagi.");
        }
      }
    });
  };

  return (
    <>
      <header className='m-2 flex justify-between items-center bg-slate-50 pl-4 py-2 shadow-lg lg:ml-[19rem] lg:py-5'>
        <h1 className='font-semibold'>
          Dasboard
        </h1>
        <button type='button' onClick={() => setIsOpen(!isOpen)} className='h-11 w-11 lg:hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
          </svg>
        </button>
      </header>

      <aside className={`${!isOpen ? '-ml-72' : ''} bg-slate-800 shadow-lg fixed inset-y-0 left-0 z-30 w-72 duration-300  lg:ml-0`}>
        <button type="button" onClick={() => setIsOpen(!isOpen)} className='text-white w-full flex justify-end p-4 lg:hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
          </svg>
        </button>
        <Image src={Logo} alt='Logo JalanKita' className='h-12 w-auto px-4 lg:mt-10' />
        <ul className='mt-10 flex flex-col gap-2'>
          {listMenu.map((list) => (
            <li key={list.link}>
              <Link href={list.link} className={`${props.page == list.text && 'bg-emerald-500'} flex items-center gap-2 text-white px-3 py-4 hover:bg-emerald-500`}>
                {list.icon}
                {list.text}
              </Link>
            </li>
          ))}
          <li>
            <button type='button' onClick={handleLogout} className='flex items-center gap-2 text-red-400 px-3 w-full py-4 hover:bg-red-400 hover:text-slate-800'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-open-fill" viewBox="0 0 16 16"><path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/></svg>
              Keluar
            </button>
          </li>
        </ul>
      </aside>
    </>
  )
}
