import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Product } from "../model/product.model";
@Injectable({ providedIn: "root"})
export class ProductsService {
    constructor(private http: HttpClient){

    }
    getAllProducts():Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(host+"/products");
    }

    getSelectedProducts():Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(host+"/products?selected=true");
    }
    getAvailableroducts():Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(host+"/products?available=true");
    }
    searchProduct(keyword:string):Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(host+"/products?name_like="+keyword);
    }
    select(product:Product):Observable<Product>{
        let host = environment.host;
        product.selected = !product.selected;
        return this.http.put<Product>(host+"/products/"+product.id,product);
    }
    onDelete(product:Product):Observable<void>{
        let host = environment.host;
        
        return this.http.delete<void>(host+"/products/"+product.id);
    }

    onSave(product:Product):Observable<Product>{
        let host = environment.host;
        return this.http.post<Product>(host+"/products",product);
    }

    onEdit(product:Product):Observable<Product>{
        let host = environment.host;
        return this.http.put<Product>(host+"/products/"+product.id,product);
    }

    getProducts(id:number):Observable<Product>{
        let host = environment.host;
        return this.http.get<Product>(host+"/products/"+id);
    }
}