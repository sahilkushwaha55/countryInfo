import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home, {loader as homeLoader} from './pages/Home'
import FavCountries from './pages/FavCountries'
import Layout from './components/Layout'
import Error from './components/Error'
import Error404 from './components/Error404'

const router = createBrowserRouter(createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} loader={homeLoader} errorElement={<Error />} />
        <Route path='favorite' element={<FavCountries />} errorElement={<Error />} />
        <Route path='*' element={<Error404 />} />
      </Route>
))

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
