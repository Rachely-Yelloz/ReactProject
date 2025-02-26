// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface Ingredient {
//   Name: string;
//   Count: number;
//   Type: string;
// }

// interface Recipe {
//   Id: number;
//   Name: string;
//   Instructions: { Id: number; Name: string }[]; // עדכון סוג ההוראות
//   Difficulty: number; // עדכון סוג הקושי
//   Duration: number; // עדכון סוג הזמן
//   Description: string;
//   UserId: number;
//   CategoryId: number | null; // עדכון סוג הקטגוריה
//   Img: string;
//   Ingredients: Ingredient[]; // שינוי ל-Ingridents
// }

// const RecipeList: React.FC = () => {
//   const [recipes, setRecipes] = useState<Recipe[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await axios.get<Recipe[]>('http://localhost:8080/api/recipe');
//         console.log(response.data); // הדפס את התגובה מהשרת
//         setRecipes(response.data);
//       } catch (err) {
//         setError('Failed to fetch recipes');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h1>Recipes</h1>
//       {recipes.length === 0 ? (
//         <div>No recipes found</div>
//       ) : (
//         recipes.map(recipe => (
//           <div key={recipe.Id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
//             <h2>{recipe.Name}</h2>
//             <img src={recipe.Img} alt={recipe.Name} style={{ width: '100px', height: '100px' }} />
//             <p><strong>Description:</strong> {recipe.Description}</p>
//             <p><strong>Difficulty:</strong> {recipe.Difficulty}</p>
//             <p><strong>Duration:</strong> {recipe.Duration}</p>
//             <h3>Instructions</h3>
//             <ul>
//               {recipe.Instructions && recipe.Instructions.map((instruction, index) => (
//                 <li key={index}>{instruction.Name}</li>
//               ))}
//             </ul>
//             <h3>Ingredients</h3>
//             <ul>
//               {recipe.Ingredients && recipe.Ingredients.map((ingredient, index) => (
//                 <li key={index}>{ingredient.Count} {ingredient.Type} of {ingredient.Name}</li>
//               ))}
//             </ul>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default RecipeList;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Ingredient {
  Name: string;
  Count: number;
  Type: string;
}

interface Recipe {
  Id: number;
  Name: string;
  Instructions: { Id: number; Name: string }[];
  Difficulty: number;
  Duration: number;
  Description: string;
  UserId: number;
  CategoryId: number | null;
  Img: string;
  Ingredients: Ingredient[];
}

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const currentUserId = 1; // הנח שהמשתמש המחובר הוא עם ID 1

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get<Recipe[]>('http://localhost:8080/api/recipe');
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

  const editRecipe = (recipeId: number) => {
    // כאן תוכל להוסיף לוגיקה לעריכת המתכון, כמו פתיחת טופס עריכה
    alert(`עריכת המתכון עם ID: ${recipeId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Recipes</h1>
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
              <button onClick={() => editRecipe(recipe.Id)}>ערוך מתכון</button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
