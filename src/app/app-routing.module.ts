import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/pages/home/home.component";
import {ProductsComponent} from "./components/pages/products/products.component";
import {ProductComponent} from "./components/pages/product/product.component";
import {OrderComponent} from "./components/pages/order/order.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/:id', component: ProductComponent},
  {path: 'order', component: OrderComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
