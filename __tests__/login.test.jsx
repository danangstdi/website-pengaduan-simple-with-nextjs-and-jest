import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../src/components/views/login/LoginForm';
import '@testing-library/jest-dom';
import Cookies from 'js-cookie';

// Mock Toast
jest.mock('../src/components/partials/Toast', () => ({
  Toast: jest.fn(),
}));

// Mock router
const pushMock = jest.fn();
jest.mock('nextjs-toploader/app', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

// Mock cookies
jest.mock('js-cookie', () => ({
  set: jest.fn(),
}));

// Simulasikan env
process.env.NEXT_PUBLIC_ADMIN_ID = 'admin123';
process.env.NEXT_PUBLIC_ADMIN_PASSWORD = 'pass123';
process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME = 'auth_admin';

describe('LoginForm with cookie', () => {
  beforeEach(() => {
    pushMock.mockClear();
    Cookies.set.mockClear();
  });

  it('berhasil login dan menyimpan cookie', () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('Masukkan ID'), {
      target: { value: 'admin123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Masukkan Kata Sandi'), {
      target: { value: 'pass123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /masuk/i }));

    expect(Cookies.set).toHaveBeenCalledWith('auth_admin', 'admin123', { expires: 7 });
    expect(pushMock).toHaveBeenCalledWith('/dashboard');
  });

  it('menampilkan toast error jika login gagal', () => {
    const { Toast } = require('../src/components/partials/Toast');

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('Masukkan ID'), {
      target: { value: 'admin987' },
    });
    fireEvent.change(screen.getByPlaceholderText('Masukkan Kata Sandi'), {
      target: { value: 'pass987' },
    });

    fireEvent.click(screen.getByRole('button', { name: /masuk/i }));

    expect(Cookies.set).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
    expect(Toast).toHaveBeenCalledWith('error', 'ID atau Kata Sandi salah!');
  });
});
