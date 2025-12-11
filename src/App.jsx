 
import { useState } from 'react';
import './App.css'
import AuthProvider, { ThemeContext }   from './Provider/AuthProvider'; 

import { Toaster } from 'react-hot-toast';
import { router } from './Routes/Routes';
import { RouterProvider } from 'react-router';

function App() {
  const [darkMode, setDarkmode] = useState(true);

  return (
    <>
       <ThemeContext.Provider value={{darkMode, setDarkmode}}>
      <AuthProvider>
       <div className={`h-full w-full ${darkMode ? "dark" : ""}`}>
            <RouterProvider router={router} />
          </div>
        
       <Toaster position='top-right' reverseOrder={false} />
     </AuthProvider>
       
      </ThemeContext.Provider> 
    </>
  )
}

export default App
