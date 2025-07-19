// app/page.tsx
import { type NextRequest } from 'next/server';
import PropertyManagementPage from './themes/property_management/page';

export default async function MainPage({ request }: { request: NextRequest }) {
  const url = new URL(request.url);
  const mode = url.searchParams.get('mode');

  if (mode !== 'property_management') {
    return <PropertyManagementPage />;
  }

  return <div>No mode</div>;
}