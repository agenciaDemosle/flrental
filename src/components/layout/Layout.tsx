/**
 * FL Rental - Main Layout
 */

import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';
import QuoteCart from '@/components/quote/QuoteCart';
import QuoteButton from '@/components/quote/QuoteButton';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingButtons />
      <QuoteButton />
      <QuoteCart />
    </div>
  );
}
