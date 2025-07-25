import { Suspense } from 'react';
import HeaderClient from './header_cliient';

export default function Header({ title = "Simple Ticket" }: { title?: string }) {
  return (
    <Suspense fallback={<div className="h-16 w-full" />}>
      <HeaderClient title={title} />
    </Suspense>
  );
}