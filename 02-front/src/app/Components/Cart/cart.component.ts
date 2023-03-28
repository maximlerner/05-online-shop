import { Component,OnInit, Output, EventEmitter } from "@angular/core";
import { NgForm } from '@angular/forms';
import { DeliveryService } from './../../Services/delivery.service';
import { ProductService } from 'src/app/Services/product.service';
import { CartService } from 'src/app/Services/cart.service';
import { ItemService } from './../../Services/item.service';
import { Item } from 'src/app/Models/item.model';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    citys = ['Choose a city', 'Jerusalem', 'Haifa', 'Tel-Aviv', 'Rishon-Lezion', 'Petah-Tikva', 'Ashdod', 'Netanya', 'Bnei Brak'];

    isOrder: boolean = false;
    isInvoice: boolean = false;
    @Output() isCart = new EventEmitter<{ status: boolean }>();
    cartActive: boolean = false;

    items: Item[] = [];

    cart = {
      cartID: '',
      customerID: '',
      cartResolved: '',
    }
  
    customerID = '';

    readyToLoadItems = false;

    totalPrice = 0;

    constructor(
        private cartService: CartService,
        private itemService:ItemService,
        private productService: ProductService,
        private deliveryService: DeliveryService
        ) {}

    ngOnInit() {
        console.log('ngOnInit');
        this.buildCart();
    }

    onToggleOrder() {
        this.isOrder = !this.isOrder;
        console.log(this.isOrder);
    }

    onToggleCart() {
        this.isCart.emit({ status: true })
    }
    
    goToShop() {
        this.isCart.emit({ status: true })
        this.isInvoice = false;
        this.isOrder = false;
    }

    onSubmit(form: NgForm) {
        console.log(form.value);
        const price = this.totalPrice;
        const customerIDRegistered = this.customerID;
        const cartToResolve = this.cart.cartID;
        this.deliveryService.createDelivery(form.value,price,customerIDRegistered,cartToResolve).subscribe((data: any)=> {
            console.log(data.data.delivery);
            this.cartService.updateCart(this.cart.cartID).subscribe(()=>{
                this.isInvoice = true;
            })
        })
    }

    buildCart() {
        //1) Check if user have unresolved carts if he doesn't have create new one and if he have add items to new cart
        setTimeout(()=>{
            if(localStorage.getItem('userID')) {
                this.customerID = String(localStorage.getItem('userID'));
    
                this.cartService.findCart(this.customerID).subscribe((data: any) => {
                  if(data.carts.length > 0) {
                    this.cart.cartID = data.carts[0].cartID;
                    this.cart.customerID = data.carts[0].customerID;
                    this.cart.cartResolved = data.carts[0].cartResolved;
    
                    //Find items by cartID
                    const useCartID = this.cart.cartID;
                    this.getItems(useCartID);
                    console.log(this.items.length);             
                } else {
                    // Create new cart
                    this.cartService.createCart(this.customerID).subscribe((data: any) => {
                        console.log('Cart have been created');
                    },(err)=> {
                        console.log(err.error.message);
                    })
                    
                }
            })
        }

        },50)
}

getItems(useCartID: string) {
    this.itemService.findItems(useCartID).subscribe((data: any) => {  
      this.items = data.cartItems
      this.items.forEach(element => {
        const findByID = element.productID;
        const foundProduct = this.productService.getProduct(findByID).subscribe((data: any)=> {
            // console.log(data.product.productName);
            element.productName = data.product.productName;
            this.totalPrice = this.totalPrice + element.pricePerItem;

        });
        console.log(foundProduct);
        // element.cartID = findByID
        console.log(element.productID);                 
      });
    
      console.log(this.items);
    }) 
    setTimeout(()=> {
        this.readyToLoadItems = true;
    },100)
    }

    onDeleteItem(cartItemID: string) {
        console.log(cartItemID);
        this.itemService.deleteItem(cartItemID).subscribe(()=> {
            this.buildCart();
        },(err)=> console.log(err))
    }

    onDeleteCart() {
        try{
            const deletedCartID = this.cart.cartID;
            console.log(deletedCartID);
            this.cartService.deleteCart(deletedCartID).subscribe(() => {
                console.log('cart Deleted');
                this.itemService.deleteItemsByCart(deletedCartID).subscribe((res: any) => {
                    console.log(res);
                    console.log(`Deleted cart ID is ${deletedCartID} and deleted cart Items` );
                    this.onToggleCart();
                })
            })
        } catch (err) {
            console.log(err);
        }
    }
}