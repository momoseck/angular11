import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionEvent, ProductActionsType } from '../../state/product.state';

@Component({
  selector: 'app-product-nav-bar',
  templateUrl: './product-nav-bar.component.html',
  styleUrls: ['./product-nav-bar.component.css']
})
export class ProductNavBarComponent implements OnInit {
@Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onGetAllProducts(){
    this.productEventEmitter.emit({type:ProductActionsType.GET_ALL_PRODUCTS});
  }
  onGetSelectedProducts(){
    this.productEventEmitter.emit({type: ProductActionsType.GET_SELECTED_PRODUCTS});
  }
  onGetAvailableProducts(){
    this.productEventEmitter.emit({type:ProductActionsType.GET_AVAILABLE_PRODUCTS});
  }
  onGetNewProducts(){
    this.productEventEmitter.emit({type:ProductActionsType.NEWL_PRODUCTS});
  }
  onSearch(dataForm:any){
    this.productEventEmitter.emit({type:ProductActionsType.SEARCH_PRODUCTS , payload: dataForm});
  }
}
