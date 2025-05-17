import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to the Dashboard</h1>
      <p className={`${lusitana.className} mt-4 text-lg text-gray-600`}>
        Start building something great.
      </p>

      <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
        {/* Desktop Hero Image */}
        <Image
          src="/hero-desktop.png"
          width={1000}
          height={760}
          className="hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        />
        {/* Mobile Hero Image */}
        <Image
          src="/hero-mobile.png"
          width={560}
          height={620}
          className="block md:hidden"
          alt="Screenshot of the dashboard project showing mobile version"
        />
      </div>
    </main>
  );
}



