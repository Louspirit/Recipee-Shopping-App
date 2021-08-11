import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { RecipeService } from '../recipes/recipe.service';
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
        RecipeService
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ]
})
export class CoreModule { }
