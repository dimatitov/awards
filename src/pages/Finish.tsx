import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from './routes';

const Finish: FC = () => {
  const navigate = useNavigate();
  const redierct = () => {
    navigate(ROUTES.CATEGOTIES)
}

  useEffect(() => {
    setTimeout(() => redierct(), 1000)
  }, [redierct])

  return (
    <div>
      <h1 style={{ color: 'green' }}>Ваш выбор сохранен!</h1>
    </div>
  );
};

export default Finish;