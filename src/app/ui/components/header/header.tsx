import { Suspense } from 'react';
import HeaderClient from './header_cliient';
import { useModule } from '@/app/core/context/module';

export default function Header() {

    const { module, setModule } = useModule();

      const getTitle = () => (module ? `Simple ${module.title}` : 'Simple Ticket');

  
  return (
    <Suspense fallback={<div className="h-16 w-full" />}>
      <HeaderClient title={getTitle()} />
    </Suspense>
  );
}