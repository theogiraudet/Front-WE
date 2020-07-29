import React from 'react';
import { Router } from 'react-router-dom';
import { history } from './router';
import { RootPage } from './pages';

import './auth/init';

export const App: React.FC = () => (
  <Router history={history}>
    <RootPage />
  </Router>
);
