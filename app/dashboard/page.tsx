import RevenueChart from './revenue-chart';
import LatestInvoices from './latest-invoices';
import { lusitana } from '@/app/ui/fonts'; 


export default function Page() {
  return (
    <main className="flex w-full flex-col gap-6">
      <h1 className={`${lusitana.className} text-2xl`}>Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <RevenueChart />
        <LatestInvoices />
      </div>
    </main>
  );
} 

