import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { ContextoPage } from '@/pages/ContextoPage';
import { OverviewPage } from '@/pages/OverviewPage';
import { FundamentosPage } from '@/pages/FundamentosPage';
import { PraticoPage } from '@/pages/PraticoPage';
import { ServerPage } from '@/pages/ServerPage';
import { DockerPage } from '@/pages/DockerPage';

function App() {
  const [currentSection, setCurrentSection] = useState('home');

  const renderPage = () => {
    switch (currentSection) {
      case 'home':
        return <HomePage />;
      case 'contexto':
        return <ContextoPage />;
      case 'overview':
        return <OverviewPage />;
      case 'fundamentos':
        return <FundamentosPage />;
      case 'pratico':
        return <PraticoPage />;
      case 'server':
        return <ServerPage />;
      case 'docker':
        return <DockerPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Layout currentSection={currentSection} onSectionChange={setCurrentSection}>
      {renderPage()}
    </Layout>
  );
}

export default App;
