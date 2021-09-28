import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, ParamMap  } from '@angular/router';
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
import { AdminOrdersComponent} from './admin-orders/admin-orders.component'
import { AdminRoutesComponent } from './admin-routes/admin-routes.component'
import { RecieveOrdersComponent  } from './recieve-orders/recieve-orders.component';

import { AuthGuard } from './guards/auth.guard'
import { IsAdminGuard } from './guards/is-admin.guard'


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate:[AuthGuard] },
  { path: 'notfound', component: PageNotFoundComponent },
  { path: 'singin', component: RegisterComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate:[IsAdminGuard] },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'home', component:HomeComponent},
  { path: 'customize-order', component:CustomizeOrderComponent },
  { path: 'generate-route', component:GenerateRouteComponent, canActivate:[IsAdminGuard]},
  { path: 'dev-tools', component:DevToolsComponent, canActivate:[IsAdminGuard]},
  { path: 'random-data', component:RandomDataComponent},
  { path: 'route', component:RouteComponent},
  { path: 'admin-orders', component:AdminOrdersComponent},
  { path: 'admin-routes', component:AdminRoutesComponent},
  { path: 'recive-orders', component:RecieveOrdersComponent},
  { path: '**', component: LoginComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }