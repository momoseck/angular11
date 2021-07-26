import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { EventDrivenService } from 'src/app/services/event.driven.service';
import { ActionEvent, ProductActionsType } from '../../../state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
@Input() product?:Product ;
//@Output() eventEmitter:EventEmitter<ActionEvent> = new EventEmitter(); 
  constructor(private eventDrivenService:EventDrivenService) { }

  ngOnInit(): void {
  }
  onSelect(product:Product){
    // this.eventEmitter.emit({
    //   type: ProductActionsType.SELECT_PRODUCTS,
    //   payload: product,
    // });
    this.eventDrivenService.publishEvent({
         type: ProductActionsType.SELECT_PRODUCTS,
        payload: product,
       });
  }
  onDelete(product:Product){
    // this.eventEmitter.emit({
    //   type: ProductActionsType.DELETE_PRODUCTS,
    //   payload: product,
    // });
    this.eventDrivenService.publishEvent({
      type: ProductActionsType.DELETE_PRODUCTS,
     payload: product,
    });
  }
  onEdit(product:Product){
    // this.eventEmitter.emit({
    //   type: ProductActionsType.EDIT_PRODUCTS,
    //   payload: product,
    // });
    this.eventDrivenService.publishEvent({
      type: ProductActionsType.EDIT_PRODUCTS,
     payload: product,
    });
  }
}
