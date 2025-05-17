'use client';

import { useActionState } from 'react';
import { updateInvoice, State } from '@/app/lib/actions';
import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const [state, formAction] = useActionState(updateInvoiceWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Dropdown */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              defaultValue={invoice.customer_id}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((err) => (
                <p key={err} className="mt-2 text-sm text-red-500">
                  {err}
                </p>
              ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Amount
          </label>
          <div className="relative">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              defaultValue={invoice.amount / 100}
              placeholder="Enter USD amount"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
              aria-describedby="amount-error"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount &&
              state.errors.amount.map((err) => (
                <p key={err} className="mt-2 text-sm text-red-500">
                  {err}
                </p>
              ))}
          </div>
        </div>

        {/* Status Radio */}
        <fieldset className="mb-4">
          <legend className="mb-2 block text-sm font-medium">Status</legend>
          <div className="flex gap-4" aria-describedby="status-error">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="pending"
                defaultChecked={invoice.status === 'pending'}
              />
              <ClockIcon className="h-4 w-4 text-gray-500" />
              Pending
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="paid"
                defaultChecked={invoice.status === 'paid'}
              />
              <CheckIcon className="h-4 w-4 text-green-500" />
              Paid
            </label>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((err) => (
                <p key={err} className="mt-2 text-sm text-red-500">
                  {err}
                </p>
              ))}
          </div>
        </fieldset>

        {/* General form error */}
        {state.message && (
          <p className="mt-2 text-sm text-red-500" aria-live="polite">
            {state.message}
          </p>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/invoices"
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm"
          >
            Cancel
          </Link>
          <Button type="submit">Update Invoice</Button>
        </div>
      </div>
    </form>
  );
} 


