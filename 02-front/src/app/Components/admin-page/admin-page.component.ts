import { AdminActionsComponent } from '../admin-actions/admin-actions.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/product.model';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  @ViewChild(AdminActionsComponent) view !: AdminActionsComponent;

  inputObj = {
    inputId : '',
    inputImage : '',
    inputName : '',
    inputCategory : '',
    inputPrice : '',
  }
  userName = localStorage.getItem("userName");
  adminActionsActive: boolean = false;
  
  btnToggleToAdd: boolean = true;

  products: Product[] = [];

  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  
  getProducts() {
    this.product.getProducts().subscribe((data: any) => {
      this.products = data.products
      console.log(this.products);
    }, (err) => {
      console.log(err);
    })

  }

  onAddProduct() {
    this.btnToggleToAdd = true;
    this.adminActionsActive = !this.adminActionsActive;
  }

  onUpdateProduct(id: string, productImage: string, productName: string, productCategory: string, productPrice: string) {
    this.btnToggleToAdd = false;

    this.inputObj= {    
    inputId : id,
    inputImage : productImage,
    inputName : productName,
    inputCategory : productCategory,
    inputPrice : productPrice,
  }
    this.adminActionsActive = !this.adminActionsActive;
  }

  onDeleteProduct(id: string) {
    console.log(id);
    this.product.deleteProduct(id).subscribe({
      next:(res)=> {
        this.getProducts();
        alert('Product deleted successfuly');
      }
    })
  }
  CloseActions() {
    this.onAddProduct();
  }
}
