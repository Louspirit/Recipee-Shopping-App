import { NgModule } from '@angular/core';
import { DropDownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert/alert.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';

@NgModule({
    declarations: [
        DropDownDirective,
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceholderDirective
    ],
    exports: [
        CommonModule,
        DropDownDirective,
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceholderDirective
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule {}
