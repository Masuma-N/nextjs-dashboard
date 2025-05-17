// app/dashboard/invoices/page.tsx
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import Table from '@/app/ui/invoices/table';
import Pagination from '@/app/ui/invoices/pagination';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function Page() {
  const headersList = await headers();
  const rawUrl = headersList.get('x-next-url');
  const searchParams = new URLSearchParams(rawUrl?.split('?')[1]);

  const query = searchParams.get('query') || '';

  // Safe page parsing to avoid NaN error 
  const rawPage = searchParams.get('page');
  const currentPage = Number.isNaN(Number(rawPage)) ? 1 : Number(rawPage);

  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
    //* @ts-expect-error Server Component 
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
} 
