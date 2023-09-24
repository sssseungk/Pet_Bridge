import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './contexts/Auth';
import router from './routes';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <HelmetProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <div className="App">
              <RouterProvider router={router} />
            </div>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </AuthProvider>
      </HelmetProvider>
      <Toaster />
    </>
  );
}

export default App;
