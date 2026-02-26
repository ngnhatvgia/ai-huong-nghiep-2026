import React from 'react';
import { useApp, AppProvider } from './context/AppContext';
import { WelcomeScreen } from './components/WelcomeScreen';
import { UserInfoForm } from './components/UserInfoForm';
import { HollandTest } from './components/HollandTest';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultsDashboard } from './components/ResultsDashboard';
import { CareerSearch } from './components/CareerSearch';
import { Compass, Search as SearchIcon } from 'lucide-react';

const MainContent = () => {
  const { step, view, setView } = useApp();

  return (
    <div className="min-h-screen bg-[#FAFAF9] font-sans text-stone-900">
      <header className="bg-white border-b border-stone-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('wizard')}>
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
              AI
            </div>
            <span className="font-bold text-lg tracking-tight hidden md:inline">CareerCoach<span className="text-orange-600">VN</span></span>
          </div>
          
          <div className="flex bg-stone-100 p-1 rounded-xl">
            <button
              onClick={() => setView('wizard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === 'wizard' ? 'bg-white text-orange-600 shadow-sm' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <Compass className="w-4 h-4" />
              Hướng nghiệp
            </button>
            <button
              onClick={() => setView('search')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === 'search' ? 'bg-white text-orange-600 shadow-sm' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <SearchIcon className="w-4 h-4" />
              Tra cứu
            </button>
          </div>

          {view === 'wizard' && step > 0 && (
            <div className="text-sm text-stone-500 font-medium hidden md:block">
              Bước {step}/4
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {view === 'search' ? (
          <CareerSearch />
        ) : (
          <>
            {step === 0 && <WelcomeScreen />}
            {step === 1 && <UserInfoForm />}
            {step === 2 && <HollandTest />}
            {step === 3 && <LoadingScreen />}
            {step === 4 && <ResultsDashboard />}
          </>
        )}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
