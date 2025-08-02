import { Suspense } from 'react';
import HeaderClient from './header_cliient';
import { useModule } from '@/app/core/context/module';

export default function Header() {

  

  
  return (
    <Suspense fallback={<div className="h-16 w-full" />}>
      <HeaderClient  />
    </Suspense>
  );
}