import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCategories } from '../services/api';
import { Categories as CategoriesType } from '../services/interfaces';
import { ROUTES } from './routes';

const Categories: FC = () => {
      const navigate = useNavigate();
    const [categories, setCategories] = useState<CategoriesType>([])
    const [isLoading, setLoading] = useState<boolean>(false);

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
      <button onClick={() =>  navigate(ROUTES.HOME)}>назад</button>
      <h1>Выберите категорию</h1>
      {categories.map((category) => (
        <Link key={category._id} to={`/categories/${category._id}`}>
          <button>{category.name}</button>
        </Link>
      ))}
    </div>
  );
};

export default Categories;