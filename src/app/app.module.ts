import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductsComponent } from './components/pages/products/products.component';
import {ProductsService} from "./services/products.service";
import { LoaderComponent } from './components/common/loader/loader.component';
import { TeaCardComponent } from './components/common/tea-card/tea-card.component';
import {HttpClientModule} from "@angular/common/http";
import { ShortenTextPipe } from './pipes/shorten-text.pipe';
import { ProductComponent } from './components/pages/product/product.component';
import { OrderComponent } from './components/pages/order/order.component';
import {ReactiveFormsModule} from "@angular/forms";
import { PopUpComponent } from './components/common/pop-up/pop-up.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    LoaderComponent,
    TeaCardComponent,
    ShortenTextPipe,
    ProductComponent,
    OrderComponent,
    PopUpComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
