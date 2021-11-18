import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component'
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'
import { AddOrderComponent } from './add-order/add-order.component'
import { HomeComponent } from './home/home.component'
import { CustomizeOrderComponent } from './customize-order/customize-order.component'
import { GenerateRouteComponent } from './generate-route/generate-route.component'
import { DevToolsComponent } from './dev-tools/dev-tools.component'
import { RandomDataComponent } from './random-data/random-data.component'
import { RouteComponent } from './route/route.component'
import { AdminOrdersComponent } from './admin-orders/admin-orders.component'
import { AdminRoutesComponent } from './admin-routes/admin-routes.component'
import { RecieveOrdersComponent } from './recieve-orders/recieve-orders.component';
import { CreateUserComponent } from './create-user/create-user.component';

import { AuthGuard } from './guards/auth.guard'
import { IsAdminGuard } from './guards/is-admin.guard'
import { CreateWarehouseComponent } from './create-warehouse/create-warehouse.component';
import { DriverMenuComponent } from './driver-menu/driver-menu.component';
import { AssingRoutesComponent } from './assing-routes/assing-routes.component';
import { GestGuard } from './guards/gest.guard';


const routes: Routes =  [
  { path: 'login', component: LoginComponent , canActivate:[GestGuard]},
  { path: 'singin', component: RegisterComponent, canActivate:[GestGuard] },
  { path: 'notfound', component: PageNotFoundComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate:[IsAdminGuard] },
  { path: 'add-order', component: AddOrderComponent, canActivate:[IsAdminGuard] },
  { path: 'home', component:HomeComponent, canActivate:[AuthGuard]},
  { path: 'customize-order', component:CustomizeOrderComponent },
  { path: 'generate-route', component:GenerateRouteComponent, canActivate:[IsAdminGuard]},
  { path: 'dev-tools', component:DevToolsComponent, canActivate:[IsAdminGuard]},
  { path: 'random-data', component:RandomDataComponent, canActivate:[IsAdminGuard]},
  { path: 'route', component:RouteComponent, canActivate:[IsAdminGuard]},
  { path: 'admin-orders', component:AdminOrdersComponent, canActivate:[IsAdminGuard]},
  { path: 'admin-routes', component:AdminRoutesComponent, canActivate:[IsAdminGuard]},
  { path: 'recive-orders', component:RecieveOrdersComponent, canActivate:[IsAdminGuard]},
  { path: 'create-user', component:CreateUserComponent, canActivate:[IsAdminGuard]},
  { path: 'create-warehouse', component: CreateWarehouseComponent, canActivate:[IsAdminGuard]},
  { path: 'driver-menu', component:DriverMenuComponent},
  { path: 'assign-routes', component: AssingRoutesComponent, canActivate:[IsAdminGuard]},
  { path: '', component: LoginComponent, canActivate:[GestGuard]  },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [IsAdminGuard, GestGuard]
})
export class AppRoutingModule { }