import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import AppShell from '@/components/layout/AppShell';
import ChatSimulation from '@/pages/ChatSimulation';
import AnalyticsDashboard from '@/pages/AnalyticsDashboard';
import FlowchartVisualizer from '@/pages/FlowchartVisualizer';
import Quizzes from '@/pages/Quizzes';
import ReferenceHub from '@/pages/ReferenceHub';

function App() {
  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path="/" element={<ChatSimulation />} />
          <Route path="/chat" element={<ChatSimulation />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/flowchart" element={<FlowchartVisualizer />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/reference" element={<ReferenceHub />} />
        </Routes>
      </AppShell>
      <Toaster />
    </Router>
  );
}

export default App;
