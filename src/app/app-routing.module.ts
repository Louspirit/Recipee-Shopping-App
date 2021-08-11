import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'recipes', canLoad: [AuthGuard], loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
    { path: 'not-found', component: HeaderComponent },
    // { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
