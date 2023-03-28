import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { ShopComponent } from './Components/shop/shop.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { CartComponent } from './Components/Cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { ShortenPipe } from './shorten.Pipe';
import { ProductService } from './Services/product.service';
import { UserGuard } from './Services/userGuard.service';
import { GuestGuard } from './Services/guestGuard';
import { AboutComponent } from './Components/about/about.component';
import { OrderService } from './Services/order.service';
import { AdminPageComponent } from './Components/admin-page/admin-page.component';
import { AdminActionsComponent } from './Components/admin-actions/admin-actions.component';
import { CheckUserComponent } from './Components/check-user/check-user.component';
import { CartService } from './Services/cart.service';
import { ItemService } from './Services/item.service';
import { DeliveryService } from './Services/delivery.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/check-user', pathMatch: 'full' },
  { path: 'check-user', component: CheckUserComponent },
  {
    path: 'shopping-list', component: ShopComponent, canActivate: [UserGuard], children: [
      { path: 'DairyCheeseEggs', component: ProductListComponent },
      { path: 'FreshFruit', component: ProductListComponent },
      { path: 'Breads&Bakery', component: ProductListComponent },
      { path: 'SoftDrinks', component: ProductListComponent },
      { path: 'cart', component: AboutComponent }
    ]
  },
  {
    path: 'adminPage', component: AdminPageComponent, canActivate: [UserGuard], children: [
      { path: 'addProduct', component: AdminActionsComponent },
      { path: 'updateProduct', component: AdminActionsComponent },
    ]
  },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'about', component: AboutComponent },

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    ShopComponent,
    ProductListComponent,
    CartComponent,
    ShortenPipe,
    AboutComponent,
    AdminPageComponent,
    AdminActionsComponent,
    CheckUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [CartComponent, ProductService, OrderService,CartService,ItemService,DeliveryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
