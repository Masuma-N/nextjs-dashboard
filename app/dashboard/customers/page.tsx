import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import { fetchCustomers } from '@/app/lib/data';
import CustomerTable from '@/app/ui/customers/table';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function CustomersPage() {
  const customers = await fetchCustomers();

  return (
    <main className="w-full">
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Customers
      </h1>

      <Suspense fallback={<div>Loading customers...</div>}>
        <CustomerTable customers={customers} />
      </Suspense>
    </main>
  );
} //tears 


