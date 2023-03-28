import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminPageComponent } from '../admin-page/admin-page.component';

import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.css']
})
export class AdminActionsComponent implements OnInit {

  categories = ['Choose Category', 'Dairy, Cheese & Eggs', 'Fresh Fruit', 'Breads & Bakery', 'Soft Drinks']

  @Input() addProductBTN: boolean = false;
  @Output() isActionsForm = new EventEmitter<{ status: boolean }>();

  //Product data from admin-page component
  @Input() objProduct: any;

  constructor(private productService: ProductService, private adminPageComponent: AdminPageComponent) { }

  ngOnInit(): void {
  }

  onToggleActions() {
    this.isActionsForm.emit({ status: true });
    this.addProductBTN = true;
  }

  onSubmit(form: NgForm) {
    console.log(this.objProduct);
    console.log(form.value);

    if(this.addProductBTN) {
      this.productService.addProduct(form.value).subscribe({
        next:()=> {
          this.adminPageComponent.getProducts();
          alert('Product added');
        },
        error:(err)=> {
          console.log('Somthing went wrong!');
          console.log(err);
        }
      })
    } else {
      const id = this.objProduct.inputId;
      const productData = form.value;
      this.productService.updateProduct(id, productData).subscribe({
        next: ()=> {
          this.adminPageComponent.getProducts();
          alert('Product have been updated');
        }
      })
    }

    form.reset();
    this.onToggleActions();
  }

}
