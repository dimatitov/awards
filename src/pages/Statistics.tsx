import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gerAllVotes, getCategories } from '../services/api';
import { Voteses } from '../services/interfaces';
import { Categories } from '../services/interfaces';
import VotesChart from '../components/VotesChart';
import { ROUTES } from './routes';


const Statistics: FC = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [allVotes, setAllVotes] = useState<Voteses>([]);
  const [categories, setCategories] = useState<Categories>([])

  const getAllVotes = async () => {
    setLoading(true)
    try {
      const response = await gerAllVotes();
      setAllVotes(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  };

    useEffect(() => {
        getAllVotes()    
    }, [])

    const handleGetCategories = async () => {
        setLoading(true)
        try {
            const response = await getCategories();
            setCategories(response.data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        } 
    };
  
    useEffect(() => {
        handleGetCategories()
    }, [])



  if (isLoading) {
    return <div>Загрузка ...</div>
  }

  return (
    <div>
        <button onClick={() => navigate(ROUTES.HOME)}>назад</button>
        <h1>Общая статистика</h1>
        <VotesChart data={allVotes} />
        <h3>Выберите категорию статистики</h3>
          {categories.map((category) => (
            <Link key={category._id} to={`/statistics/${category._id}`}>
              <button>{category.name}</button>
            </Link>
          ))}
    </div>
  );
};

export default Statistics;