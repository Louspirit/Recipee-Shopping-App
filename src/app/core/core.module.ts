import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { AuthGuard } from '../auth/auth-guard.service';
import { AuthService } from '../auth/auth.service';
import { RecipeResolver } from '../recipes/recipe-resolver.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { SharedModule } from '../shared/shared.module';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule
    ],
    providers: [
        ShoppingListService,
        RecipeService,
        RecipeResolver,
        DataStorageService,
        AuthService,
        AuthGuard
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ]
})
export class CoreModule { }
