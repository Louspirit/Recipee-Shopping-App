import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Recipe } from '../../recipes/recipe.model';
import { RecipeService } from '../../recipes/recipe.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    isAuthenticated = false;
    private userSub = new Subscription();

    constructor(private dsService: DataStorageService, private recipeService: RecipeService, private authService: AuthService) {}

    ngOnInit() {
        this.userSub = this.authService.userSubject.subscribe(user => {
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
          });
    }

    onSaveData() {
       this.dsService.storeRecipes().subscribe(
           (response: any) => {
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
