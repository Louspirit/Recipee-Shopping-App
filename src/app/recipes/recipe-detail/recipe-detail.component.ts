import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  public recipeToDetail!: Recipe;
  public id: number=-1;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.route.data.subscribe(
    //   (data: Data) => {
    //   this.recipeToDetail = data['recipe'];
    //   console.log("change:"+this.recipeToDetail);
    //   });
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeToDetail = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onToShoppingList(){
    console.log("To shopping list");
    this.recipeService.addIngredientsToShoppingList(this.recipeToDetail.ingredients);
  }

  onEditRecipe(){
    // Easy way
    // this.router.navigate(['edit'], {relativeTo: this.route});
    // Complex way
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
