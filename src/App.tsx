import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { SignupScreen } from './components/SignupScreen';
import { StockPickerScreen } from './components/StockPickerScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { PortfolioScreen } from './components/PortfolioScreen';
import { NewsScreen } from './components/NewsScreen';
import { SearchScreen } from './components/SearchScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomNav } from './components/BottomNav';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'signup' | 'profile' | 'dashboard' | 'stockpicker' | 'stockcast' | 'portfolio' | 'news' | 'search'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userStocks, setUserStocks] = useState<any[]>([]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const handleSignup = () => {
    setCurrentScreen('login');
  };

  const handleStockPickerComplete = (stocks: any[]) => {
    userStocks;
    setUserStocks(stocks);
    setCurrentScreen('search');
  };

  const handleStockPickerSkip = () => {
    setCurrentScreen('search');
  };

  const renderScreen = () => {
    if (!isAuthenticated) {
      if (currentScreen === 'signup') {
        return <SignupScreen onBack={() => setCurrentScreen('login')} onSignup={handleSignup} />;
      }
      return <LoginScreen onLogin={handleLogin} onSignup={() => setCurrentScreen('signup')} />;
    }

    if (currentScreen === 'stockpicker') {
      return <StockPickerScreen onComplete={handleStockPickerComplete} onSkip={handleStockPickerSkip} />;
    }

    switch (currentScreen) {
      case 'portfolio':
        return <PortfolioScreen />;
      case 'news':
        return <NewsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'search':
        return <SearchScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-md h-screen flex flex-col">
        <div className="flex-1 overflow-auto">
          {renderScreen()}
        </div>
        {isAuthenticated && currentScreen !== 'stockpicker' && (
          <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
        )}
      </div>
    </div>
  );
}
