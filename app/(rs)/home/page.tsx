import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Home',
    description: 'Home page',
}

export default async function HomePage() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}