'use client';

import { useRouter } from 'next/navigation';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
 


export function CreateInvoiceButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push('/dashboard/invoices/create')}
      className="bg-blue-600 hover:bg-blue-500"
    >
      <PlusIcon className="w-5 h-5 mr-2" />
      New Invoice
    </Button>
  );
}

