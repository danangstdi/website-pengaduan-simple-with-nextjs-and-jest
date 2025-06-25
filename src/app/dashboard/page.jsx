import DashboardNav from "@/components/layouts/DashboardNav";
import DashboardFooter from "@/components/layouts/DashboardFooter";
import TableComponents from "@/components/views/dashboard/TableComponents";

export default async function Dashboard() {
  return (
    <>
      <DashboardNav/>

      <main className='m-2 flex justify-between items-center bg-slate-50 p-4 shadow-lg lg:ml-[19rem] lg:py-5'>
        <TableComponents/>
      </main>

      <DashboardFooter/>
    </>
  )
}
