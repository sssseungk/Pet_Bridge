import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Place from './pages/Place';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import SearchProduct from './pages/SearchProduct';
import Map from './pages/Map';
import Index from './pages/Index';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Index />} />
      <Route path="home" element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="place" element={<Place />} />
      <Route path="productlist" element={<ProductList />} />
      {/* <Route path="productdetail" element={<ProductDetail />} /> */}
      <Route
        path="productlist/detail/:productTitle"
        element={<ProductDetail />}
      />
      <Route path="search" element={<SearchProduct />} />
      <Route path="map" element={<Map />} />
    </Route>
  )
);

export default router;
