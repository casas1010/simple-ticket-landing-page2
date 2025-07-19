// app/page.tsx
import PropertyManagementPage from './themes/property_management/page';

export default function MainPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const mode = searchParams.mode;

  if (mode !== 'property_management') {
    return <PropertyManagementPage />;
  }

  return <div>No mode or unsupported mode provided.</div>;
}