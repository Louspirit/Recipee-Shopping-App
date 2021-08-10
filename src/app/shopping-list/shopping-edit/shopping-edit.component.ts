import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f',{static: true}) slForm: NgForm;

  constructor(private slService : ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index; 
        this.editedItem = this.slService.getIngredient(this.editedItemIndex);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onAddIngredient(form: NgForm){
    const value = form.value;
    const ingName = value.name;
    const ingAmount = value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      form.reset();
      this.editMode = false;
    }else{
      this.slService.addIngredient(newIngredient);
    }
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onResetForm();
  }

  onResetForm(){
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
