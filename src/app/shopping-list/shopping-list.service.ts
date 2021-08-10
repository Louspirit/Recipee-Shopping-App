import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";


export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',2)
      ];

      getIngredients(){
            //Get a copy instead of reference
          return this.ingredients.slice();
      }

      addIngredient(ingredientToAdd: Ingredient){
        this.ingredients.push(ingredientToAdd);
        this.ingredientsChanged.next(this.ingredients.slice());
      } 
      
      addIngredients(ingredientsToAdd: Ingredient[]){
        // ingredientsToAdd.forEach(ingredient => {
          //   this.addIngredient(ingredient);
          // });
          //ES6 spread operator
          this.ingredients.push(...ingredientsToAdd);
          this.ingredientsChanged.next(this.ingredients.slice());
        }

      getIngredient(index: number){
        return this.ingredients[index];
      }

      updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index: number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
}