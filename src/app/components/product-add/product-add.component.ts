import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productFormGroup?:FormGroup ;
  sumitted:boolean = false;
  constructor(private formbuilder:FormBuilder,private productService:ProductsService) { }

  ngOnInit(): void {
    this.productFormGroup = this.formbuilder.group({
      name:["",Validators.required],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required]
    });
  }

  onSaveProduct(){
    this.sumitted = true;
    if(this.productFormGroup?.invalid) return ;
    this.productService.onSave(this.productFormGroup?.value).subscribe(data=>{
      alert("success");
    });
  }
}
