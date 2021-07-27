import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component'
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'
import { AddOrderComponent } from './add-order/add-order.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'notfound', component: PageNotFoundComponent },
  { path: 'singin', component: RegisterComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'home', component:HomeComponent},
  { path: '**', component: LoginComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }