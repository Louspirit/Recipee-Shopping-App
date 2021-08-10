import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { StartRecipeComponent } from './start-recipe/start-recipe.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { RecipesResolverService } from './recipes-resolver.service';

const recipeRoutes: Routes = [
    { path: '', component: RecipesComponent, children : [
        { path: '', component: StartRecipeComponent },
        //Order is important otherwise new could be interprated as an id
        { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard]},
        { path: ':id', component: RecipeDetailComponent, resolve:[RecipesResolverService] },
        //{ path: ':name', component: RecipeDetailComponent, resolve: {recipe: RecipeResolver} }
        { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard], resolve:[RecipesResolverService] }
    ] },
];

@NgModule({
    imports: [
        RouterModule.forChild(recipeRoutes)
    ],
    exports: [RouterModule]
})
export class RecipesRoutingModule { }
