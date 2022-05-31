
import { AppThemeProvider } from './shared/contexts';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './routes';

export default  function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </AppThemeProvider>
  );
}

