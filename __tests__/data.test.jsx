import { render, screen, waitFor } from '@testing-library/react';
import TableComponents from '../src/components/views/dashboard/TableComponents';
import '@testing-library/jest-dom';
import { useEffect, useState } from 'react';

jest.mock('../src/components/utils/GetData', () => ({
  GetData: jest.fn(),
}));

jest.mock('../src/components/utils/FormatDate', () => ({
  FormatDate: (date) => `Formatted: ${date}`,
}));

// Wrapper untuk menjalankan komponen async
function Wrapper() {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    TableComponents().then(setComponent);
  }, []);

  return Component;
}

describe('TableComponents', () => {
  it('menampilkan pesan jika tidak ada laporan', async () => {
    const { GetData } = require('../src/components/utils/GetData');
    GetData.mockResolvedValue({ data: [] });

    render(<Wrapper />);

    await waitFor(() => {
      expect(screen.getByText(/belum ada laporan masuk/i)).toBeInTheDocument();
    });
  });
});
