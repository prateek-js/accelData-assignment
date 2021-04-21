import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { OrderHistoryComponent } from '../app/order-history/order-history.component';

const routes: Routes = [{
  path: '', component: DashboardComponent
},{ 
  path: 'dashboard', component: DashboardComponent 
}, {
  path: 'order-history', component: OrderHistoryComponent 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
