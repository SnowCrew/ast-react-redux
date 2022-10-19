import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home/Home.component';
import NotFoundPage from './routes/not-found-page/NotFoundPage.component';
import Navigation from './routes/Navigation/Navigation.component';
import About from './routes/About/About.component';
import ItemPage from './routes/ItemPage/ItemPage.component';
import CartPage from './routes/CartPage/CartPage.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/ast-react-redux' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path=':id' element={<ItemPage />} />
        <Route path='cart' element={<CartPage />} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
