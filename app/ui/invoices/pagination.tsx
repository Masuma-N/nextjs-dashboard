'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;

  function handleClick(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-2">
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={`px-4 py-2 border rounded ${
              page === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-black'
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
} 

