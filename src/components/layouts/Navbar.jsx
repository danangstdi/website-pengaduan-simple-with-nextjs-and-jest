"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo from '@/../public/img/jalankita-logo.png'
import Link from 'next/link'

export default function Navbar({ pageNav = 'Kirim Laporan' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenNav, setIsOpenNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const listPageNav = [
    {link: '/', label: 'Kirim Laporan'},
    {link: '/tentang-jalankita', label: 'Tentang JalanKita'},
    {link: '/pusat-bantuan', label: 'Pusat Bantuan'},
  ]

  return (
    <header className={`${isScrolled && 'bg-slate-800 shadow-lg'} z-40 p-4 fixed inset-x-0 top-0 md:px-6 md:py-2 lg:px-14`}>
      <nav className='flex justify-between items-center'>
        <Image src={Logo} alt='Logo JalanKita' className='h-12 w-auto' loading='lazy' />
        <button type='button' name='nav-button' aria-label='nav-button' onClick={() => setIsOpenNav(!isOpenNav)} className='w-11 h-11 flex items-center justify-center md:hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
          </svg>
        </button>
        <ul className={`${!isOpenNav ? 'hidden' : 'nav-list fixed bg-slate-800 shadow-lg inset-y-0 right-0 w-3/4 text-white z-50 px-4 md:static md:bg-transparent md:z-auto md:w-auto'} py-4 md:px-0 md:flex md:items-center md:gap-10`}>
          <li className='p-3 md:hidden'>
            <Image src={Logo} alt='Logo JalanKita' className='h-auto w-3/4' loading='lazy' />
          </li>
          {listPageNav.map((nav) => (
            <li key={nav.link} className={`${pageNav == nav.label && 'font-semibold'} flex rounded-md text-sm text-white hover:bg-slate-700 hover:duration-200 md:hover:bg-transparent md:hover:text-gray-300`}>
              <Link href={nav.link} className='w-full h-11 flex items-center p-3 md:p-0 md:w-fit'>
                {nav.label}
              </Link>
            </li>
          ))}
        </ul>
        {
          isOpenNav && 
          <div 
              onClick={() => setIsOpenNav(!isOpenNav)} 
              className='md:hidden fixed inset-0 bg-gray-600 bg-opacity-50 z-40'>
          </div>
        }
      </nav>
    </header>
  )
}
