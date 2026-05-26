import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6">
        <Search className="w-10 h-10 text-brand-primary" />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-black text-brand-dark mb-4 tracking-tight">
        404 - Page Not Found
      </h1>
      
      <p className="text-lg text-slate-500 max-w-md mb-8 font-medium">
        Oops! We couldn't find the page you were looking for. It might have been moved or doesn't exist.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button size="lg" className="w-full bg-brand-primary hover:bg-brand-dark text-white rounded-full font-bold shadow-lg">
            <Home className="w-4 h-4 mr-2" />
            Back to Homepage
          </Button>
        </Link>
        <Link href="/#inquiry">
          <Button size="lg" variant="outline" className="w-full rounded-full font-bold border-slate-200">
            Contact Support
          </Button>
        </Link>
      </div>
    </div>
  );
}