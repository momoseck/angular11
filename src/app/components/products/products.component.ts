import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { Product } from 'src/app/model/product.model';
import { EventDrivenService } from 'src/app/services/event.driven.service';
import { ProductsService } from 'src/app/services/products.service';
import {
  ActionEvent,
  AppDataState,
  DataStateEnum,
  ProductActionsType,
} from '../state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> | null = null; // syntaxe utiliser $ à la fin convention
  readonly DataStateEnum = DataStateEnum;

  constructor(private evenDrivrenService:EventDrivenService,
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.evenDrivrenService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      this.onActionEvent(actionEvent);
    })
  }

  onGetAllProducts() {
    this.products$ = this.productService.getAllProducts().pipe(
      map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }
  onGetSelectedProducts() {
    this.products$ = this.productService.getSelectedProducts().pipe(
      map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }
  onGetAvailableProducts() {
    this.products$ = this.productService.getAvailableroducts().pipe(
      map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onSearch(dataForm: any) {
    this.products$ = this.productService.searchProduct(dataForm.keyword).pipe(
      map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onSelect(product: Product) {
    this.productService.select(product).subscribe((data) => {
      product.selected = data.selected;
    });
  }

  onDelete(product: Product) {
    let v = confirm('etes vous sure ?');
    if (v == true)
      this.productService.onDelete(product).subscribe((data) => {
        this.onGetAllProducts();
      });
  }

  onGetNewProducts() {
    this.router.navigateByUrl('/newProduct');
  }

  onEdit(product: Product) {
    this.router.navigateByUrl('/editProduct/' + product.id);
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionsType.GET_ALL_PRODUCTS:
        this.onGetAllProducts();
        break;
      case ProductActionsType.GET_SELECTED_PRODUCTS:
        this.onGetSelectedProducts();
        break;
      case ProductActionsType.GET_AVAILABLE_PRODUCTS:
        this.onGetAvailableProducts();
        break;
      case ProductActionsType.NEWL_PRODUCTS:
        this.onGetNewProducts();
        break;
      case ProductActionsType.SEARCH_PRODUCTS:
        this.onSearch($event.payload);
        break;
      case ProductActionsType.SELECT_PRODUCTS:
        this.onSelect($event.payload);
        break;
      case ProductActionsType.EDIT_PRODUCTS:
        this.onEdit($event.payload);
        break;
      case ProductActionsType.DELETE_PRODUCTS:
        this.onDelete($event.payload);
        break;
    }
  }
}
