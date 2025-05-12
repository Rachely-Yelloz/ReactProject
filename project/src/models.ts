export interface Ingredient {
    Name: string;
    Count: number;
    Type: string;
  }
  
 export interface RecipeFormData {
    Id: number;
    Name: string;
    Instructions: { Id: number; Name: string }[];
    Difficulty: number;
    Duration: number;
    Description: string;
    UserId: number;
    Categoryid : number | null;
    Img: string;
    Ingredients : Ingredient[];
  }