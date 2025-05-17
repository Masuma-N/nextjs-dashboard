import { formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';
import InvoiceRow from './invoice-row'; // Importing the new Client Component

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile view */}
          <div className="md:hidden">
            {invoices.length === 0 ? (
              <p className="p-4 text-gray-500">No invoices found.</p>
            ) : (
              invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <div className="text-sm text-gray-500">Customer</div>
                      <div className="text-sm font-medium text-gray-900">
                        {invoice.customer_name}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex w-full items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Amount</div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(invoice.amount)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Status</div>
                      <div className="text-sm font-medium text-gray-900">
                        {invoice.status}
                      </div>
                    </div>
                  </div>
                </div> 
              ))
            )}
          </div>

          {/* Desktop Table */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                    No invoices found.
                  </td>
                </tr>
              ) : (
                invoices.map((invoice) => (
                  <InvoiceRow key={invoice.id} invoice={invoice} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


 



