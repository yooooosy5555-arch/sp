import {Home, User, Eye, FileText, Search } from 'lucide-react';

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: 'dashboard' | 'portfolio' | 'news' | 'search' | 'profile') => void;
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard', icon: Home, label: '홈' },
    { id: 'search', icon: Search, label: '종목 알아보기' },
    { id: 'portfolio', icon: Eye, label: '포트폴리오' },
    { id: 'news', icon: FileText, label: '뉴스' },
    { id: 'profile', icon: User, label: '마이' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-lg border-t border-zinc-800">
      <div className="mx-auto max-w-md">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as any)}
                className="flex flex-col items-center gap-1 p-2 flex-1 transition-all"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isActive ? 'bg-blue-500 shadow-lg shadow-blue-500/30' : 'bg-transparent'
                }`}>
                  <Icon className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-white' : 'text-zinc-400'
                  }`} />
                </div>
                <span className={`text-xs transition-colors truncate max-w-full ${
                  isActive ? 'text-blue-500' : 'text-zinc-500'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
