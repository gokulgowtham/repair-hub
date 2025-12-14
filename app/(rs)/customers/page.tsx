import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Customers',
    description: 'Customers page',
}

export default async function CustomersPage() {
  return (
    <main>
      <h1>Customers</h1>
    </main>
  );
}