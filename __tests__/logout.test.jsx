import { render, screen, fireEvent } from '@testing-library/react';
import DashboardNav from '../src/components/layouts/DashboardNav';
import '@testing-library/jest-dom';
import Cookies from 'js-cookie';

// Mock Swal
jest.mock('sweetalert2', () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
}));

// Mock Toast
jest.mock('../src/components/partials/Toast', () => ({
  Toast: jest.fn(),
}));

// Mock next/image dan next/link
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} alt={props.alt || 'mocked image'} />,
}));
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }) => <a href={href}>{children}</a>,
}));

// Mock router
const pushMock = jest.fn();
jest.mock('nextjs-toploader/app', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

// Simulasi ENV dan Cookies
process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME = 'auth_admin';

jest.mock('js-cookie', () => ({
  get: jest.fn(() => 'admin123'),
  remove: jest.fn(),
}));

describe('DashboardNav Logout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('melakukan logout jika dikonfirmasi', async () => {
    render(<DashboardNav page="Dashboard" />);

    // Klik tombol logout
    const logoutButton = screen.getByRole('button', { name: /keluar/i });
    fireEvent.click(logoutButton);

    // Tunggu next tick karena Swal.fire pakai promise
    await Promise.resolve();

    expect(Cookies.remove).toHaveBeenCalledWith('auth_admin');
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('tidak logout jika dibatalkan', async () => {
    const Swal = require('sweetalert2');
    Swal.fire.mockResolvedValueOnce({ isConfirmed: false });

    render(<DashboardNav page="Dashboard" />);

    const logoutButton = screen.getByRole('button', { name: /keluar/i });
    fireEvent.click(logoutButton);

    await Promise.resolve();

    expect(Cookies.remove).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });
});
