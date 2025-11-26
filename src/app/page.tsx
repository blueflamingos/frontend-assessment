import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <main className='flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 gap-y-12 bg-white dark:bg-black sm:items-center'>
        <h1 className='text-2xl font-bold'>Blue Flamingos Frontend Assessment</h1>
        <Button asChild>
          <Link href='/checkout'>Naar checkout</Link>
        </Button>
      </main>
    </div>
  );
}
