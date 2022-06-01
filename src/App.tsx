
import { AppThemeProvider } from './shared/contexts';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './routes';
import { SideMenu } from './shared/components';

export default  function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <SideMenu>
          <AppRoute />
        </SideMenu>
      </BrowserRouter>
    </AppThemeProvider>
  );
}

