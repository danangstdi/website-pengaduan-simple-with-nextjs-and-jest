import { FormatDate } from "@/components/utils/FormatDate";
import { GetData } from "@/components/utils/GetData";

export default async function TableComponents() {
  const getReports = await GetData(`${process.env.APP_URL}/api/reports`);
  const reports = getReports.data;

  return (
    <div className="overflow-x-auto shadow-md w-full sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              NO.
            </th>
            <th scope="col" className="px-6 py-3">
              JUDUL
            </th>
            <th scope="col" className="px-6 py-3">
              PELAPOR
            </th>
            <th scope="col" className="px-6 py-3">
              DETAIL
            </th>
            <th scope="col" className="px-6 py-3">
              TANGGAL
            </th>
            <th scope="col" className="px-6 py-3">
              KONTAK
            </th>
          </tr>
        </thead>
        <tbody>
          {!reports || reports.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                Belum ada laporan masuk
              </td>
            </tr>
            ) : reports.map((report, index) => (
                <tr key={report.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-slate-800 font-semibold">
                    {index + 1} .
                  </td>
                  <td className="px-6 py-4 text-slate-800 font-semibold">
                    {report.title}
                  </td>
                  <td scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                    <div>
                      <div>
                        {report.name}
                      </div>
                      <p className="font-normal text-gray-500">
                        {report.nim}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-800">
                    {report.detail}
                  </td>
                  <td className="px-6 py-4 text-slate-800">
                    {FormatDate(report.reportAt)}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <a href={`https://wa.me/${report.phone}`} target="_blank"
                      className="relative p-3 text-white overflow-hidden bg-slate-800 
                                before:absolute before:py-20 before:px-40 before:w-[140%] before:-left-[20rem] before:-top-8 before:rounded-[5rem] before:bg-slate-700
                                hover:before:-left-16 hover:before:top-0 hover:before:text-black hover:before:duration-700 hover:before:ease-in-out hover:before:-z-10
                                hover:z-10"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                      </svg>
                    </a>
                  </td>
                </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
