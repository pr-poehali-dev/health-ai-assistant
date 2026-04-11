import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Icon from '@/components/ui/icon';
import HomePage from './pages/HomePage';
import SymptomsPage from './pages/SymptomsPage';
import PhotoPage from './pages/PhotoPage';
import PreventionPage from './pages/PreventionPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';

const queryClient = new QueryClient();

type Page = 'home' | 'symptoms' | 'photo' | 'prevention' | 'history' | 'profile';

const NAV_ITEMS: { id: Page; icon: string; label: string }[] = [
  { id: 'home', icon: 'Home', label: 'Главная' },
  { id: 'symptoms', icon: 'Stethoscope', label: 'Симптомы' },
  { id: 'photo', icon: 'Camera', label: 'Фото' },
  { id: 'prevention', icon: 'ShieldCheck', label: 'Здоровье' },
  { id: 'history', icon: 'Clock', label: 'История' },
  { id: 'profile', icon: 'User', label: 'Профиль' },
];

function AppContent() {
  const [page, setPage] = useState<Page>('home');

  const navigate = (p: string) => setPage(p as Page);

  return (
    <div className="relative max-w-md mx-auto min-h-screen bg-background overflow-hidden">
      {/* Page content */}
      <div className="h-screen overflow-y-auto">
        {page === 'home' && <HomePage onNavigate={navigate} />}
        {page === 'symptoms' && <SymptomsPage />}
        {page === 'photo' && <PhotoPage />}
        {page === 'prevention' && <PreventionPage />}
        {page === 'history' && <HistoryPage />}
        {page === 'profile' && <ProfilePage />}
      </div>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 backdrop-blur-xl border-t border-border px-2 pb-safe z-50">
        <div className="flex items-center justify-around py-2">
          {NAV_ITEMS.map((item) => {
            const isActive = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-2xl nav-pill min-w-[52px] ${
                  isActive
                    ? 'bg-primary/10'
                    : 'hover:bg-secondary'
                }`}
              >
                <Icon
                  name={item.icon}
                  fallback="Circle"
                  size={22}
                  className={isActive ? 'text-primary' : 'text-muted-foreground'}
                />
                <span
                  className={`text-[10px] font-medium leading-none ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
