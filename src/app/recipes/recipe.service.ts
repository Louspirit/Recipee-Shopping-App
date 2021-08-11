import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe('Chicken lemon basilic', 'The best recipe ever.', 'https://images.media-allrecipes.com/userphotos/560x315/5462317.jpg',
        [new Ingredient('chicken', 4),
        new Ingredient('flour tablespoons', 2),
        new Ingredient('butter tablespoon', 2),
        new Ingredient('lemon zest', 1)]),
        new Recipe('Grilled Chicken Thighs Tandoori',
        'Moist, luscious, and delicious. Just the right blend of spices make this chicken dish one of my most-requested. Great hot or cold. If using thighs with skin, you can put over direct medium heat for the last few minutes to crisp skin.',
        'https://images.media-allrecipes.com/userphotos/250x250/122209.jpg',
        [new Ingredient('chicken thighs', 16),
        new Ingredient('black pepper teaspoon', 2),
        new Ingredient('ground coriander teaspoon', 2),
        new Ingredient('olive oil', 1)]),
      ];

      constructor(private slService: ShoppingListService, private http: HttpClient) {

      }

    getRecipes() {
        // Returns a copy
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    getRecipeByName(name: string) {
        return this.recipes.find(
                (recipe: Recipe) => {
                    return name === recipe.name;
                });
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    restoreRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}
