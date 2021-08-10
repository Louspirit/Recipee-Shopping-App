import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
interface Server {
id: number;
name: string;
status: string;
}
@Injectable()
export class RecipeResolver implements Resolve<Recipe> {
constructor(private recipeService: RecipeService){}

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe{
    return this.recipeService.getRecipeByName(route.params['name']);
}
}
