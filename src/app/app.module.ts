import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login-page/login-page.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
// import {Router,NavigationStart, NavigationEnd } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatCardModule } from '@angular/material/card';
import { ChartsComponent } from './charts/charts.component';
import { AllTableComponent } from './alltable/alltable.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { EnrouteForPickupComponent } from './enroute-for-pickup/enroute-for-pickup.component';
import { AtpickupComponent } from './atpickup/atpickup.component';
import { IntransitComponent } from './intransit/intransit.component';
import { AtUnloadingComponent } from './at-unloading/at-unloading.component';
import { CompletedComponent } from './completed/completed.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PendingorderComponent } from './pendingorder/pendingorder.component';
import { OrderformComponent } from './orderform/orderform.component';
import { TestingComponent } from './testing/testing.component';
import { HomepageComponent } from './homepage/homepage.component';
import { GuestComponent } from './guest/guest.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PodComponent } from './pod/pod.component';
import { BillingComponent } from './billing/billing.component';
import { PaymentComponent } from './payment/payment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
  FirstpageComponent,
    AllTableComponent,
    LoginComponent,
   
  
    ChartsComponent,
           EnrouteForPickupComponent,
           AtpickupComponent,
           IntransitComponent,
           AtUnloadingComponent,
           CompletedComponent,
           NavbarComponent,
           PendingorderComponent,
           OrderformComponent,
           TestingComponent,
           HomepageComponent,
           GuestComponent,
           PodComponent,
           BillingComponent,
           PaymentComponent,
           DashboardComponent,
           SignupComponent
  ],
  imports: [
    NgxPaginationModule,
    MatCardModule,
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [{provide:LocationStrategy,useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
