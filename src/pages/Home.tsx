import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from './routes';
import { gerUserInfo } from '../services/api';

const Home: FC = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<string>('No name');

  const getUser = async (userId: string) => {
    setLoading(true)
    try {
      const response = await gerUserInfo(userId);
      setUser(response.data.name);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    console.log('userId', userId)
    if (userId) {
        getUser(userId)
    }
  }, [])

  if (isLoading) {
    return <div>Загрузка ...</div>
  }

  return (
    <div>
      <h1>Привет {user}!</h1>

        <button onClick={() => navigate(ROUTES.STATISTICS)}>Статистика</button>
        <button onClick={() => navigate(ROUTES.CATEGOTIES)}>Голосование</button>
    </div>
  );
};

export default Home;