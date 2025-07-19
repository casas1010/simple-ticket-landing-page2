// app/page.tsx
import { headers } from 'next/headers';
import PropertyManagementPage from './themes/property_management/page';

export default function MainPage() {
  const headersList = headers(); 

  return <PropertyManagementPage />;
}