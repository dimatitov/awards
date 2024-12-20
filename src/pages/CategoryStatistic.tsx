import { FC, useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategory, getVotes } from '../services/api';
import { Category, Voteses } from '../services/interfaces';
import { ROUTES } from './routes';
import VotesChart from '../components/VotesChart';

const CategoryStatistic: FC = () => {
  const { category: categoryId } = useParams<{ category: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [votes, setVotes] = useState<Voteses>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const getVotesByCategory = async (categoryId: string) => {
    setLoading(true)
    try {
      const response = await getVotes(categoryId);
      setVotes(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getCategory(categoryId || '');
      setCategory(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    if (categoryId) {
      getVotesByCategory(categoryId)
    }
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  if (isLoading) {
    return <div>Загрузка ...</div>
  }

  if (category === null) {
    return <div>Ошибка при получнии категории</div>
  }

  return (
    <div>
      <button onClick={() =>  navigate(ROUTES.STATISTICS)}>назад</button>
      <h1>{category.name}</h1>

      <VotesChart data={votes} />
    </div>
    
  );
};

export default CategoryStatistic;