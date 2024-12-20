import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Categories from './pages/Categories';
import List from './pages/List';
import Finish from './pages/Finish';
import { ROUTES } from './pages/routes';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import CategoryStatistic from './pages/CategoryStatistic';

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.ROOT} element={<Login />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.STATISTICS} element={<Statistics />} />
        <Route path={ROUTES.STATISTIC} element={<CategoryStatistic />} />
        <Route path={ROUTES.CATEGOTIES} element={<Categories />} />
        <Route path={ROUTES.CATEGORY} element={<List />} />
        <Route path={ROUTES.FINISH} element={<Finish />} />
        <Route path={ROUTES.OTHER} element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;