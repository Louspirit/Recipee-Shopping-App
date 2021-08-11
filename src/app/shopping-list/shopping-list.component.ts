import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[]=[];
  constructor(private shoppingListService: ShoppingListService) { }
  private IngredientChangedSubscription: Subscription=new Subscription();


  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.IngredientChangedSubscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.IngredientChangedSubscription.unsubscribe();
  }

  onAddedIngredient(event: any) {

  }

}
