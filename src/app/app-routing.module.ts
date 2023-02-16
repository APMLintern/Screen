import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AllTableComponent} from './alltable/alltable.component';

import { LoginComponent } from './login-page/login-page.component';

import { FirstpageComponent } from './firstpage/firstpage.component';

import { ChartsComponent } from './charts/charts.component';
import { EnrouteForPickupComponent } from './enroute-for-pickup/enroute-for-pickup.component';
import { AtpickupComponent } from './atpickup/atpickup.component';
import { AtUnloadingComponent } from './at-unloading/at-unloading.component';
import { CompletedComponent } from './completed/completed.component';
import { IntransitComponent } from './intransit/intransit.component';
import { PendingorderComponent } from './pendingorder/pendingorder.component';
import { OrderformComponent } from './orderform/orderform.component';
import { TestingComponent } from './testing/testing.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './auth.guard';
import { GuestComponent } from './guest/guest.component';
import { PodComponent } from './pod/pod.component';
import { BillingComponent } from './billing/billing.component';
import { PaymentComponent } from './payment/payment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';

// import {RcComponent} from '../../../../RC/RC_expire/src/app/rc/rc.component'
const routes: Routes = [
  {path:"",component:FirstpageComponent},
  {path:"signup",component:SignupComponent},


  {path:"guest",component:GuestComponent,canActivate: [AuthGuard],data: { allowedRoles: ['guest'] }},
  {path:"charts",component:ChartsComponent,canActivate: [AuthGuard],data: { allowedRoles: ['admin'] }},
  {path:"home",component:HomepageComponent,data: { allowedRoles: ['user'] } },
  {path:"pendingOrder",component:PendingorderComponent, canActivate: [AuthGuard],data: { allowedRoles: ['admin'] } },

  {path:"loginpage",component:LoginComponent},
 
  {path:"alltable",component:AllTableComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] }},
  {path:"dashboard",component:DashboardComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] }},
 
  {path:"enforpickup",component:EnrouteForPickupComponent, canActivate: [AuthGuard],data: { allowedRoles: ['admin'] } },
 
  {path:"atpickup",component:AtpickupComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] }},
 
  {path:"atunloading",component:AtUnloadingComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] }},
 
  {path:"completed",component:CompletedComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] }},
  {path:"intransit",component:IntransitComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] }},
  {path:"orderform",component:OrderformComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] }},
  {path:"test",component:TestingComponent, canActivate: [AuthGuard],data: { allowedRoles: ['admin'] }},
  {path:"pod",component:PodComponent, canActivate: [AuthGuard],data: { allowedRoles: ['admin'] }},
  {path:"bill",component:BillingComponent, canActivate: [AuthGuard],data: { allowedRoles: ['admin'] }},
  {path:"payment",component:PaymentComponent, canActivate: [AuthGuard],data: { allowedRoles: ['admin'] }},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
