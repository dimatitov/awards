import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { ROUTES } from './routes';

const Login: FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (name) {
      const response = await loginUser(name);
      localStorage.setItem('userId', response.data.userId);
      navigate(ROUTES.HOME);
    }
  };

  return (
    <div>
      <h1>Введите имя</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ваше имя"
      />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
};

export default Login;