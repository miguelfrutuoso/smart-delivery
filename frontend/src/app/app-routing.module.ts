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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'notfound', component: PageNotFoundComponent },
  { path: 'singin', component: RegisterComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'home', component:HomeComponent},
  { path: 'customize-order', component:CustomizeOrderComponent },
  { path: 'generate-route', component:GenerateRouteComponent},
  { path: 'dev-tools', component:DevToolsComponent},
  { path: 'random-data', component:RandomDataComponent},
  { path: 'route', component:RouteComponent},
  { path: '**', component: LoginComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }