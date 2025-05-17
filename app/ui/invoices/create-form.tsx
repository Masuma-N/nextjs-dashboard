'use client';

import { useActionState } from 'react';
import { CustomerField } from '@/app/lib/definitions';
import { createInvoice, State } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const initialState: State = {
  message: null,
  errors: {},
};

export default function CreateInvoiceForm({
  customers,
}: {
  customers: CustomerField[];
}) {
  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction}>
      {/* Customer Dropdown */}
      <div className="mb-4">
        <label htmlFor="customer" className="block text-sm font-medium mb-1">
          Customer
        </label>
        <div className="relative">
          <select
            id="customer"
            name="customerId"
            className="border p-2 w-full rounded-md"
            defaultValue=""
            aria-describedby="customer-error"
          >
            <option value="" disabled>
              Select a customer
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          <UserCircleIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <div id="customer-error" className="text-red-500 text-sm mt-1">
          {state.errors?.customerId?.[0]}
        </div>
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium mb-1">
          Amount
        </label>
        <div className="relative">
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            className="pl-7 pr-2 block w-full rounded-md border border-gray-300 py-2 text-sm"
            aria-describedby="amount-error"
          />
          <CurrencyDollarIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <div id="amount-error" className="text-red-500 text-sm mt-1">
          {state.errors?.amount?.[0]}
        </div>
      </div>

      {/* Status */}
      <fieldset className="mb-4">
        <legend className="block text-sm font-medium mb-1">Status</legend>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="status" value="pending" defaultChecked />
            <ClockIcon className="h-4 w-4 text-gray-400" />
            Pending
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="status" value="paid" />
            <CheckIcon className="h-4 w-4 text-green-500" />
            Paid
          </label>
        </div>
        <div className="text-red-500 text-sm mt-1">
          {state.errors?.status?.[0]}
        </div>
      </fieldset>

      {/* Submit + Cancel */}
      <div className="flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="inline-flex items-center rounded-md border px-4 py-2 text-sm"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>

      {/* General message */}
      {state.message && (
        <p className="mt-4 text-sm text-red-500">{state.message}</p>
      )}
    </form>
  );
} 
