import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Tickets',
    description: 'Tickets page',
}

export default async function TicketsPage() {
  return (
    <main>
      <h1>Tickets</h1>
    </main>
  );
}