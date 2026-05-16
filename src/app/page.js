import App from '@/components/App';
import { redirect } from 'next/navigation';

export default function Home() {
  // Check if maintenance mode is enabled
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true") {
    redirect("/maintenance");
  }

  return <App />;
}