'use client';

import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import { formatCurrency } from '@/app/lib/utils';

export default function InvoiceRow({
  invoice,
}: {
  invoice: {
    id: string;
    customer_name: string;
    customer_email: string;
    amount: number;
    status: string;
  };
}) {
  return (
    <tr className="w-full border-b py-3 text-sm last-of-type:border-none">
      <td className="whitespace-nowrap px-3 py-3">{invoice.customer_name}</td>
      <td className="whitespace-nowrap px-3 py-3">
        {formatCurrency(invoice.amount)}
      </td>
      <td className="whitespace-nowrap px-3 py-3">{invoice.status}</td>
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <UpdateInvoice id={invoice.id} />
          <DeleteInvoice id={invoice.id} />
        </div>
      </td>
    </tr>
  );
} 

