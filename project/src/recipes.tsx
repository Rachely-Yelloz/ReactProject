import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RecipeFormData } from './models';
import { TextField, MenuItem, FormControl, InputLabel, Select, Slider, Grid, Box, Button } from '@mui/material';
import { useUser } from './UserContext';

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeFormData[]>([]);
  const [filterRecipes, setfilterRecipes] = useState<RecipeFormData[]>([]);

  const [categories, setCategories] = useState<any[]>([]);


  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const [filters, setFilters] = useState({
    // category: '',
    categoryId: 0,
    duration: 180,
    difficulty: 300,
  });
  const currentUserId = user.id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCateory = async () => {
      try {
        const response = await axios.get<any[]>('http://localhost:8080/api/category');
        console.log(response.data);
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCateory();
  }, []);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get<RecipeFormData[]>('http://localhost:8080/api/recipe');
        console.log(response.data);
        setRecipes(response.data);
        setfilterRecipes(response.data);
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
  // const handleFilter = () => {
  //   // כאן תבצע את הסינון - לדוגמה:
  //   setfilterRecipes(recipes.filter(recipe => {
  //     const matchesCategory = filters.category ? recipe.CategoryId === filters.category : true;
  //     const matchesDifficulty = filters.difficulty ? recipe.Difficulty <= filters.difficulty : true;
  //     const matchesDuration = recipe.Duration <= filters.duration;

  //     return matchesDifficulty && matchesDuration && matchesCategory;
  //   }));
  //   console.log('Filtering with:', filters);
  // };
const handleFilter = () => {
  setfilterRecipes(
    recipes.filter((recipe) => {
      const matchesCategory =
        filters.categoryId === 0 || recipe.Categoryid === filters.categoryId;
      const matchesDifficulty =
        filters.difficulty === 0 || recipe.Difficulty <= filters.difficulty;
      const matchesDuration = recipe.Duration <= filters.duration;

      return matchesCategory && matchesDifficulty && matchesDuration;
    })
  );
};

return user.isLoggedIn ? (
    <div>
      <h1>Recipes</h1>
      <button onClick={addRecipe}>Add Recipe</button>
      {recipes.length === 0 ? (
        <div>No recipes found</div>
      ) : (
        <div>
          <h2>filters</h2>


          <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, mb: 3 }}>
            <h2>Filters</h2>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>

                  <Select
                    value={filters.categoryId}
                    label="Category"
                    onChange={(e) => setFilters({ ...filters, categoryId:Number( e.target.value) })}
                  >
                    <MenuItem value="">All</MenuItem>
                    {categories.map((cat) => (
                      <MenuItem key={cat.Id} value={cat.Id}>
                        {cat.Name}
                      </MenuItem>
                    ))}
                  </Select>

                </FormControl>
              </Grid>



              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Difficulty"
                  type="number" // זה מה שהופך את זה לשדה מספרי
                  value={filters.difficulty}
                  onChange={(e) =>
                    setFilters({ ...filters, difficulty: Number(e.target.value) })
                  }
                  fullWidth
                />
              </Grid>



              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ px: 1 }}>
                  <label>Max Duration: {filters.duration} min</label>
                  <Slider
                    value={filters.duration}
                    onChange={(e, newVal) => setFilters({ ...filters, duration: newVal as number })}
                    step={10}
                    min={10}
                    max={180}
                  />
                </Box>

              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFilter}
                  >
                    סנן
                  </Button>
                </Box>

              </Grid>

            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setFilters({  categoryId: 0, difficulty: 0, duration: 180 })}
                >
                  נקה
                </Button>
              </Box>

            </Grid>

          </Box>

          {filterRecipes.map(recipe => (
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
          ))}</div>
      )}
    </div>):null

};

export default RecipeList;
