import { Injectable } from "../../../node_modules/@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { map } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DataStorageService{
    urlBackend = 'https://ng-recipee-shopping.firebaseio.com/';
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService){
        
    }

    storeRecipes(){
        const token = this.authService.getToken();
        return this.http.put(this.urlBackend+'recipes.json?auth='+token, this.recipeService.getRecipes());
    }

    fetchRecipes(){
        const token = this.authService.getToken();

        return this.http.get<Recipe[]>(this.urlBackend+'recipes.json?auth='+token).pipe(
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