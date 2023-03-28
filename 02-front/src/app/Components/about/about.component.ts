import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  productCount = null;
  orderCount = null;

  constructor(private product: ProductService, private order: OrderService) { }

  ngOnInit(): void {
    this.product.getProducts().subscribe((data: any) => {
      this.productCount = data.products.length
    }, (err) => {
      console.log(err);
    })

    this.order.getOrders().subscribe((data: any) => {
      console.log(data);
      this.orderCount = data.deliveries.length
    }, (err) => {
      console.log(err);
    })
  }

}
