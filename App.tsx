
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Fixtures from './pages/Fixtures';
import TablesPage from './pages/Tables';
import ClubsPage from './pages/Clubs';
import ClubDetail from './pages/ClubDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/results" element={<Fixtures />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/clubs/:id" element={<ClubDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
