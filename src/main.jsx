import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SearchProvider } from './context/SearchContext.jsx'
import { FavoriteProvider } from './context/FavoriteContext.jsx'
import { SortProvider } from './context/SortContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchProvider>
      <FavoriteProvider>
        <SortProvider>
            <App />
        </SortProvider>
      </FavoriteProvider>
    </SearchProvider>
  </React.StrictMode>,
)
