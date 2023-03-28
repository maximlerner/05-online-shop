import { Component, OnInit} from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/product.model';
import { CartService } from 'src/app/Services/cart.service';
import { ItemService } from './../../Services/item.service';
import { CartComponent } from '../Cart/cart.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  cartActive: boolean = false;
  userName = localStorage.getItem("userName");

  products: Product[] = [];

  constructor(private product: ProductService,private cartService: CartService,private itemService:ItemService,private cartComponent: CartComponent) { }

  ngOnInit(): void {
    this.product.getProducts().subscribe((data: any) => {
      this.products = data.products
    }, (err) => {
      console.log(err);
    })
  }


  showCart() {
    this.cartActive = !this.cartActive;
    this.cartComponent.buildCart();
  }

  closeCart() {
    this.showCart()
  }

  addItem(productID: string, pricePerItem: number) {
    // need to check if cart exists and if not create a cart
    const customerID = String(localStorage.getItem("userID"));

    this.cartService.findCart(customerID).subscribe((res: any)=> {  

      // if cart exists create item for the exicting cart
      if (res.carts.length > 0) {
        const cartID = res.carts[0].cartID;

        this.itemService.createItem(productID,cartID,pricePerItem).subscribe((item: any)=>{
          console.log('New Item have been added');
        },(err)=> console.log(err.error.message)) 

        // Create new cart and then create item from the cartID recieved from the cart
      } else {
        this.cartService.createCart(customerID).subscribe((cart: any)=> {
          const newCartID = cart.data.cart.cartID;
          this.itemService.createItem(productID,newCartID,pricePerItem).subscribe(()=> {
            console.log('Cart and item have been created');
          })
        })

      }
    })
  }
}
