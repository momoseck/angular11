import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventDrivenService } from 'src/app/services/event.driven.service';
import { ProductActionsType } from '../state/product.state';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  productId: number;
  productFormGroup?: FormGroup;
  sumitted: boolean = true;
  constructor(private eventDrivenService: EventDrivenService,
    private formbuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService
  ) {
    this.productId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.getProducts(this.productId).subscribe((data) => {
      this.productFormGroup=this.formbuilder.group({
        id:this.productId,
        name: [data.name, Validators.required],
        price: [data.price, Validators.required],
        quantity: [data.quantity, Validators.required],
        selected: [data.selected, Validators.required],
        available: [data.available, Validators.required],
      });
    });
  }

  onSaveProduct() {
    this.productService
      .onEdit(this.productFormGroup?.value)
      .subscribe((data) => {
        this;this.eventDrivenService.publishEvent({type:ProductActionsType.PRODUCT_UPDATED});
        alert('success');
      });
  }
}
