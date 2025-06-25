import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from '../src/components/views/home/Form';

// Mock Toast
jest.mock('../src/components/partials/Toast', () => ({
  Toast: jest.fn(),
}));

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        message: 'Berhasil mengirim laporan',
      }),
  })
);

describe('Form Laporan Masyarakat', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('dapat mengisi dan mengirim form', async () => {
    render(<Form />);

    fireEvent.change(screen.getByPlaceholderText('Masukkan NIM Anda'), {
      target: { value: '222355212345' },
    });

    fireEvent.change(screen.getByPlaceholderText('Masukkan Nama Lengkap'), {
      target: { value: 'Danang' },
    });

    fireEvent.change(screen.getByPlaceholderText('Masukkan Nomor Whatsapp'), {
      target: { value: '81234567890' },
    });

    fireEvent.change(screen.getByPlaceholderText('Masukkan Judul Laporan'), {
      target: { value: 'Gangguan jaringan' },
    });

    fireEvent.change(screen.getByPlaceholderText('Tambahkan detail laporan'), {
      target: { value: 'Internet mati digedung Teknik sejak pagi' },
    });

    const submitButton = screen.getByRole('button', { name: /kirim laporan/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    // Validasi parameter fetch
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/reports'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('Danang'),
      })
    );
  });
});
