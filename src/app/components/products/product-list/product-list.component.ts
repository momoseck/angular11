import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import {
  ActionEvent,
  AppDataState,
  DataStateEnum,
  ProductActionsType,
} from '../../state/product.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @Input() products$: Observable<AppDataState<Product[]>> | null = null; // syntaxe utiliser $ à la fin convention
  @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  readonly DataStateEnum = DataStateEnum;
  constructor() {}

  ngOnInit(): void {}
  onSelect(product: Product) {
    this.productEventEmitter.emit({
      type: ProductActionsType.SELECT_PRODUCTS,
      payload: product,
    });
  }
  onDelete(product: Product) {
    this.productEventEmitter.emit({
      type: ProductActionsType.DELETE_PRODUCTS,
      payload: product,
    });
  }
  onEdit(product: Product) {
    this.productEventEmitter.emit({
      type: ProductActionsType.EDIT_PRODUCTS,
      payload: product,
    });
  }
  onActionEvent($event:ActionEvent){
    this.productEventEmitter.emit($event);
  }
}
