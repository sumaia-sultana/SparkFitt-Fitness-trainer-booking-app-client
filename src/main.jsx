import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
 
import AuthProvider from './Provider/AuthProvider.jsx';
import { RouterProvider } from 'react-router';
import { router } from './Routes/Routes.jsx';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
       <QueryClientProvider client={queryClient}>
       <AuthProvider>
       <div className="min-h-screen bg-white">
            <RouterProvider router={router} />
          </div>
        
       <Toaster position='top-right' reverseOrder={false} />
     </AuthProvider>
    </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
)
