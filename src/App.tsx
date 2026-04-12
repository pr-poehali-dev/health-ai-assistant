import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Icon from '@/components/ui/icon';
import { LanguageProvider, useLang } from './lib/LanguageContext';
import HomePage from './pages/HomePage';
import SymptomsPage from './pages/SymptomsPage';
import PhotoPage from './pages/PhotoPage';
import PreventionPage from './pages/PreventionPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';

const queryClient = new QueryClient();

type Page = 'home' | 'symptoms' | 'photo' | 'prevention' | 'history' | 'profile';

function AppContent() {
  const [page, setPage] = useState<Page>('home');
  const { t } = useLang();

  const NAV_ITEMS: { id: Page; icon: string; label: string }[] = [
    { id: 'home', icon: 'Home', label: t.nav_home },
    { id: 'symptoms', icon: 'Stethoscope', label: t.nav_symptoms },
    { id: 'photo', icon: 'Camera', label: t.nav_photo },
    { id: 'prevention', icon: 'ShieldCheck', label: t.nav_prevention },
    { id: 'history', icon: 'History', label: t.nav_history },
    { id: 'profile', icon: 'User', label: t.nav_profile },
  ];

  const navigate = (p: string) => setPage(p as Page);

  return (
    <div className="relative w-full max-w-md mx-auto bg-background" style={{ minHeight: '100dvh' }}>
      <div style={{ height: '100dvh', overflowY: 'auto' }}>
        {page === 'home' && <HomePage onNavigate={navigate} />}
        {page === 'symptoms' && <SymptomsPage />}
        {page === 'photo' && <PhotoPage />}
        {page === 'prevention' && <PreventionPage />}
        {page === 'history' && <HistoryPage />}
        {page === 'profile' && <ProfilePage />}
      </div>

      <nav
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-xl border-t border-border z-50"
        style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom, 8px))' }}
      >
        <div className="flex items-center justify-around px-1 pt-1 pb-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-2 rounded-2xl transition-all duration-200 nav-pill ${isActive ? 'bg-primary/10' : ''}`}
                style={{ minHeight: '52px' }}
              >
                <Icon
                  name={item.icon}
                  fallback="Circle"
                  size={22}
                  className={`transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                />
                <span className={`text-[10px] font-semibold leading-none transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
                {isActive && <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />}
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
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
