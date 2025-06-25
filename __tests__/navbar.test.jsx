import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../src/components/layouts/Navbar';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} alt={props.alt || 'mocked image'} />,
}));
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }) => <a href={href}>{children}</a>,
}));

describe('Navbar Sidebar Mobile', () => {
  beforeEach(() => {
    window.innerWidth = 375;
    window.dispatchEvent(new Event('resize'));
  });

  it('membuka dan menutup sidebar saat tombol nav diklik', () => {
    render(<Navbar />);

    const navButton = screen.getByRole('button');

    // Sidebar (ul) awal disembunyikan
    const navList = document.querySelector('ul');
    expect(navList.classList.contains('hidden')).toBe(true);

    // Klik tombol hamburger
    fireEvent.click(navButton);

    // Sidebar muncul (ul tidak lagi memiliki class hidden)
    expect(navList.classList.contains('hidden')).toBe(false);

    // Klik backdrop untuk menutup sidebar
    const backdrop = document.querySelector('.bg-opacity-50');
    fireEvent.click(backdrop);

    // Sidebar disembunyikan kembali
    expect(navList.classList.contains('hidden')).toBe(true);
  });
});
