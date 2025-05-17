import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="flow-root">
          <ul className="-my-5 divide-y divide-gray-200">
            {latestInvoices.map((invoice) => (
              <li key={invoice.id} className="py-5">
                <div className="flex items-center justify-between space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {invoice.name}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {invoice.email}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <p className="text-sm font-medium text-gray-900">
                      {invoice.amount}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <ArrowPathIcon className="h-4 w-4" />
            <span>Updated just now</span>
          </div>
        </div>
      </div>
    </div>
  ); 
}

