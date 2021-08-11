import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    urlBackend = 'https://ng-recipee-shopping.firebaseio.com/';
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {

    }

    storeRecipes() {
        return this.http.put(this.urlBackend + 'recipes.json', this.recipeService.getRecipes());
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(this.urlBackend + 'recipes.json').pipe(
            map(recipes => {
              return recipes.map( recipe => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : []
                };
              });
            })
          );
    }
}
