import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategory, getChoice, saveChoice } from '../services/api';
import { Category, CategoryItem } from '../services/interfaces';
import { ROUTES } from './routes';

const List: FC = () => {
  const { category: categoryId } = useParams<{ category: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [hasChoise, setHasChoise] = useState<boolean>(false);
  const [choiseName, setChoiseName] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const checkChoise = async (userId: string) => {
    setLoading(true)
    try {
      const response = await getChoice(userId, categoryId || '');
      setHasChoise(response.data.hasChosen);
      setChoiseName(response.data.choiceName ?? '')
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  const fetchItems = async () => {
    setLoading(true)
    try {
      const response = await getCategory(categoryId || '');
      setCategory(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      checkChoise(userId)
    }
  }, [])

  useEffect(() => {
    fetchItems();
  }, [categoryId]);



  const handleChoice = async (item: CategoryItem) => {
    const userId = localStorage.getItem('userId');
    await saveChoice(userId || '', categoryId || '', item.id, item.name);
    navigate(ROUTES.FINISH);
  };

  if (hasChoise && !isLoading) {
    return <div><button onClick={() => navigate(ROUTES.CATEGOTIES)}>назад</button><h2>Вы уже выбрали игру в этой категории: {choiseName}</h2></div>
  }

  if (isLoading) {
    return <div>Загрузка ...</div>
  }

  if (category === null) {
    return <div>Не верный id</div>
  }

  return (
    <div>
      <button onClick={() =>  navigate(ROUTES.CATEGOTIES)}>назад</button>
      <h1>{category.name}</h1>
      {category.items.map((item) => (
        <button key={item.id} onClick={() => handleChoice(item)}>
          {item.name}
        </button>
      ))}
    </div>
    
  );
};

export default List;