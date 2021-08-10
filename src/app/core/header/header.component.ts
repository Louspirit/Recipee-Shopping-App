import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Recipe } from '../../recipes/recipe.model';
import { RecipeService } from '../../recipes/recipe.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    constructor(private dsService: DataStorageService, private recipeService: RecipeService, private authService: AuthService) {}

    isAuthenticated() {
        return this.authService.isAuthenticaded();
    }

    onSaveData() {
       this.dsService.storeRecipes().subscribe(
           (response: Response) => {
               console.log(response);
           }
       );
   }
   onFetchData() {
    this.dsService.fetchRecipes().subscribe(
        (response: Recipe[]) => {
            this.recipeService.restoreRecipes(response);
        }
    );
    }

    onLogout() {
        this.authService.logout();
    }
}
