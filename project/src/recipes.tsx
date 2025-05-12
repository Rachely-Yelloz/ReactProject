
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RecipeFormData } from './models';
import RecipeForm from './RecipeForm';



const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeFormData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const currentUserId = 1; // הנח שהמשתמש המחובר הוא עם ID 1
  const navigate = useNavigate();


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get<RecipeFormData[]>('http://localhost:8080/api/recipe');
        console.log(response.data);
        setRecipes(response.data);
      } catch (err) {
        setError('Failed to fetch recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const editRecipe = (recipe: RecipeFormData) => {
    // כאן תוכל להוסיף לוגיקה לעריכת המתכון, כמו פתיחת טופס עריכה
    navigate(`/edit/${recipe.Id}`, { state: { recipe } });

  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
const addRecipe = () => {
  navigate('/Addrecipe');
}
const deleteRecipe = async (Id: number): Promise<void> => {
  if (!window.confirm('Are you sure you want to delete this recipe?')) {
    return;
  }

  try {
    await axios.post(`http://localhost:8080/api/recipe/delete/:${Id}`);
    setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.Id !== Id));
  } catch (err) {
    setError('Failed to delete the recipe');
  }
};

  return (
    <div>
      <h1>Recipes</h1>
      <button onClick={addRecipe}>Add Recipe</button>
      {recipes.length === 0 ? (
        <div>No recipes found</div>
      ) : (
        recipes.map(recipe => (
          <div key={recipe.Id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h2>{recipe.Name}</h2>
            <img src={recipe.Img} alt={recipe.Name} style={{ width: '100px', height: '100px' }} />
            <p><strong>Description:</strong> {recipe.Description}</p>
            <p><strong>Difficulty:</strong> {recipe.Difficulty}</p>
            <p><strong>Duration:</strong> {recipe.Duration}</p>
            <h3>Instructions</h3>
            <ul>
              {recipe.Instructions && recipe.Instructions.map((instruction, index) => (
                <li key={index}>{instruction.Name}</li>
              ))}
            </ul>
            <h3>Ingredients</h3>
            <ul>
              {recipe.Ingredients && recipe.Ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.Count} {ingredient.Type} of {ingredient.Name}</li>
              ))}
            </ul>
            {recipe.UserId === currentUserId && ( // בדוק אם המשתמש הוא המחבר
            <div>
              <button onClick={() => editRecipe(recipe)}>ערוך מתכון</button>
              <button onClick={() => deleteRecipe(recipe.Id)}>מחק מתכון</button></div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
