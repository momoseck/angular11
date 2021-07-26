import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EventDrivenService } from 'src/app/services/event.driven.service';
import { ActionEvent, ProductActionsType } from '../../state/product.state';

@Component({
  selector: 'app-product-nav-bar',
  templateUrl: './product-nav-bar.component.html',
  styleUrls: ['./product-nav-bar.component.css'],
})
export class ProductNavBarComponent implements OnInit {
  //@Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  constructor(private eventDrivenService: EventDrivenService) {}

  ngOnInit(): void {}
  onGetAllProducts() {
    // this.productEventEmitter.emit({type:ProductActionsType.GET_ALL_PRODUCTS});
    this.eventDrivenService.publishEvent({
      type: ProductActionsType.GET_ALL_PRODUCTS,
    });
  }
  onGetSelectedProducts() {
    //this.productEventEmitter.emit({type: ProductActionsType.GET_SELECTED_PRODUCTS});
    this.eventDrivenService.publishEvent({
      type: ProductActionsType.GET_SELECTED_PRODUCTS,
    });
  }
  onGetAvailableProducts() {
    //this.productEventEmitter.emit({type:ProductActionsType.GET_AVAILABLE_PRODUCTS});
    this.eventDrivenService.publishEvent({
      type: ProductActionsType.GET_AVAILABLE_PRODUCTS,
    });
  }
  onGetNewProducts() {
    //this.productEventEmitter.emit({type:ProductActionsType.NEWL_PRODUCTS});
    this.eventDrivenService.publishEvent({
      type: ProductActionsType.NEWL_PRODUCTS,
    });
  }
  onSearch(dataForm: any) {
    //this.productEventEmitter.emit({type:ProductActionsType.SEARCH_PRODUCTS , payload: dataForm});
    this.eventDrivenService.publishEvent({
      type: ProductActionsType.SEARCH_PRODUCTS,
      payload: dataForm,
    });
  }
}
