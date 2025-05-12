
import { useForm, useFieldArray } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { RecipeFormData } from './models';
import axios from 'axios';

export default function RecipeForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const recipe = location.state?.recipe as RecipeFormData;

    const { register, handleSubmit, control, reset } = useForm<RecipeFormData>({
        defaultValues: {
            Id: 0,
            Name: '',
            Instructions: [],
            Difficulty: 1,
            Duration: 0,
            Description: '',
            UserId: 0,
            Categoryid: null,
            Img: '',
            Ingredients: [],
        },
    });

    const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
        control,
        name: 'Ingredients',
    });

    const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
        control,
        name: 'Instructions',
    });

    useEffect(() => {
        if (!recipe) {
            alert('אין מתכון לעריכה');
            navigate('/recipes');
            return;
        }

        reset(recipe);
    }, [recipe]);

  
const onSubmit = async (data: RecipeFormData) => {
    try {
   //   הסרה של שדות שאסור לשנות (Id ו-UserId יישארו כמו שהם)
      const updatedData = {
        ...data,
        // אם ממש רוצים לוודא – אפשר גם למחוק שדות כאן, לדוגמה:
        // UserId: undefined, // אם השרת מתעלם ממנו
      };
  
      const response = await axios.post('http://localhost:8080/api/recipe/edit', updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('המתכון עודכן בהצלחה:', response.data);
      alert('המתכון נשמר בהצלחה!');
      navigate('/recipes');
    } catch (error) {
      console.error('שגיאה בשמירת המתכון:', error);
      alert('אירעה שגיאה בעת שמירת המתכון');
    }
  };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                maxWidth: '700px',
                margin: '2rem auto',
                padding: '2rem',
                backgroundColor: '#fdfaf6',
                borderRadius: '12px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                fontFamily: 'sans-serif',
                color: '#4b2e2e',
            }}
        >
            <h2 style={{ textAlign: 'center', color: '#5c3d2e' }}>עריכת מתכון</h2>

            <label>שם מתכון:</label>
            <input {...register('Name', { required: true })} style={inputStyle} />

            <label>תיאור:</label>
            <textarea {...register('Description')} style={{ ...inputStyle, height: '80px' }} />

            <label>רמת קושי:</label>
            <input type="number" {...register('Difficulty')} style={inputStyle} />

            <label>משך הכנה (בדקות):</label>
            <input type="number" {...register('Duration')} style={inputStyle} />

            <label>תמונה (URL):</label>
            <input {...register('Img')} style={inputStyle} />

            <label>קטגוריה:</label>
            <input type="number" {...register('Categoryid')} style={inputStyle} />

            <h3 style={{ color: '#6b3f2e' }}>מרכיבים:</h3>
            {ingredientFields.map((field, index) => (
                <div key={field.id} style={groupStyle}>
                    <input {...register(`Ingredients.${index}.Name`)} placeholder="שם" style={inputStyle} />
                    <input type="number" {...register(`Ingredients.${index}.Count`)} placeholder="כמות" style={inputStyle} />
                    <input {...register(`Ingredients.${index}.Type`)} placeholder="סוג" style={inputStyle} />
                    <button type="button" onClick={() => removeIngredient(index)} style={removeButtonStyle}>הסר</button>
                </div>
            ))}
            <button type="button" onClick={() => appendIngredient({ Name: '', Count: 0, Type: '' })} style={addButtonStyle}>
                הוסף מרכיב
            </button>

            <h3 style={{ color: '#6b3f2e' }}>הוראות:</h3>
            {instructionFields.map((field, index) => (
                <div key={field.id} style={groupStyle}>
                    <input {...register(`Instructions.${index}.Name`)} placeholder="שלב" style={inputStyle} />
                    <button type="button" onClick={() => removeInstruction(index)} style={removeButtonStyle}>הסר</button>
                </div>
            ))}
            <button type="button" onClick={() => appendInstruction({ Id: 0, Name: '' })} style={addButtonStyle}>
                הוסף שלב
            </button>

            <br />
            <button type="submit" style={submitButtonStyle}>שמור</button>
        </form>
    );
}

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#fffaf3',
};

const groupStyle: React.CSSProperties = {
    marginBottom: '1rem',
    padding: '0.5rem',
    backgroundColor: '#f5eee6',
    borderRadius: '8px',
};

const addButtonStyle: React.CSSProperties = {
    backgroundColor: '#a0522d',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '1rem',
};

const removeButtonStyle: React.CSSProperties = {
    backgroundColor: '#d2691e',
    color: 'white',
    padding: '0.3rem 0.7rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    marginRight: '0.5rem',
};

const submitButtonStyle: React.CSSProperties = {
    backgroundColor: '#6b4226',
    color: 'white',
    padding: '0.7rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    display: 'block',
    margin: '2rem auto 0',
};
