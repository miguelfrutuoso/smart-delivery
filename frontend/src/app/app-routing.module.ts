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
import { AnonymousLayoutComponent } from './anonymous-layout/anonymous-layout.component';
import { AuthenticatedLayoutComponent } from './authenticated-layout/authenticated-layout.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { CreateWarehouseComponent } from './create-warehouse/create-warehouse.component';
import { DriverMenuComponent } from './driver-menu/driver-menu.component';
import { AssingRoutesComponent } from './assing-routes/assing-routes.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent , canActivate:[!AuthGuard]},
  { path: 'singin', component: RegisterComponent },
  { path: 'notfound', component: PageNotFoundComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate:[IsAdminGuard] },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'home', component:HomeComponent},
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
  { path: 'assign-routes', component: AssingRoutesComponent},
  { path: '', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
  //{ path: '**', component: PageNotFoundComponent },
]



const routes22: Routes = [
	{
		path: '', component: AuthenticatedLayoutComponent, canActivate: [AuthGuard],
		children: [
			{ path: 'notfound', component: PageNotFoundComponent },
			{ path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [IsAdminGuard] },
			{ path: 'add-order', component: AddOrderComponent, canActivate: [IsAdminGuard] },
			{ path: 'home', component: HomeComponent },
			{ path: 'customize-order', component: CustomizeOrderComponent },
			{ path: 'generate-route', component: GenerateRouteComponent, canActivate: [IsAdminGuard] },
			{ path: 'dev-tools', component: DevToolsComponent, canActivate: [IsAdminGuard] },
			{ path: 'random-data', component: RandomDataComponent, canActivate: [IsAdminGuard] },
			{ path: 'route', component: RouteComponent, canActivate: [IsAdminGuard] },
			{ path: 'admin-orders', component: AdminOrdersComponent, canActivate: [IsAdminGuard] },
			{ path: 'admin-routes', component: AdminRoutesComponent, canActivate: [IsAdminGuard] },
			{ path: 'recive-orders', component: RecieveOrdersComponent, canActivate: [IsAdminGuard] },
			{ path: 'create-user', component: CreateUserComponent, canActivate: [IsAdminGuard] },
			{ path: '**', component: HomeComponent }
		]
	},
	{
		path: '', component: AnonymousLayoutComponent,
		children: [
			{ path: 'login', component: LoginComponent },
			{ path: 'singin', component: RegisterComponent },
			{ path: '**', component: LoginComponent },
		]
	}
]

const routes2: Routes = [
	{
		path: '', component: AuthenticatedLayoutComponent, canActivate: [AuthGuard],
		children: [
			{ 
				path: '', component: AdminLayoutComponent, canActivate: [IsAdminGuard],
				children: [
					{ path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [IsAdminGuard] },
					{ path: 'add-order', component: AddOrderComponent, canActivate: [IsAdminGuard] },
					{ path: 'generate-route', component: GenerateRouteComponent, canActivate: [IsAdminGuard] },
					{ path: 'dev-tools', component: DevToolsComponent, canActivate: [IsAdminGuard] },
					{ path: 'random-data', component: RandomDataComponent, canActivate: [IsAdminGuard] },
					{ path: 'route', component: RouteComponent, canActivate: [IsAdminGuard] },
					{ path: 'admin-orders', component: AdminOrdersComponent, canActivate: [IsAdminGuard] },
					{ path: 'admin-routes', component: AdminRoutesComponent, canActivate: [IsAdminGuard] },
					{ path: 'recive-orders', component: RecieveOrdersComponent, canActivate: [IsAdminGuard] },
					{ path: 'create-user', component: CreateUserComponent, canActivate: [IsAdminGuard] },
					{ path: 'notfound', component: PageNotFoundComponent },
					{ path: 'home', component: HomeComponent },
					{ path: 'customize-order', component: CustomizeOrderComponent },
				]
			},
			{
				path: '', component: ClientLayoutComponent, canActivate:[!IsAdminGuard],
				children: [
					{ path: 'notfound', component: PageNotFoundComponent },
					{ path: 'home', component: HomeComponent },
					{ path: 'customize-order', component: CustomizeOrderComponent },
				]
			}
		]
	},
	{
		path: '', component: AnonymousLayoutComponent,
		children: [
			{ path: 'login', component: LoginComponent },
			{ path: 'singin', component: RegisterComponent },
			{ path: '', component: LoginComponent },
		]
	}
]


const routes1: Routes = [
	{
		path: '', component: AuthenticatedLayoutComponent, canActivate: [AuthGuard],
		children: [
			{ path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [IsAdminGuard] },
			{ path: 'add-order', component: AddOrderComponent, canActivate: [IsAdminGuard] },
			{ path: 'generate-route', component: GenerateRouteComponent, canActivate: [IsAdminGuard] },
			{ path: 'dev-tools', component: DevToolsComponent, canActivate: [IsAdminGuard] },
			{ path: 'random-data', component: RandomDataComponent, canActivate: [IsAdminGuard] },
			{ path: 'route', component: RouteComponent, canActivate: [IsAdminGuard] },
			{ path: 'admin-orders', component: AdminOrdersComponent, canActivate: [IsAdminGuard] },
			{ path: 'admin-routes', component: AdminRoutesComponent, canActivate: [IsAdminGuard] },
			{ path: 'recive-orders', component: RecieveOrdersComponent, canActivate: [IsAdminGuard] },
			{ path: 'create-user', component: CreateUserComponent, canActivate: [IsAdminGuard] },
			{ path: 'notfound', component: PageNotFoundComponent },
			{ path: 'home', component: HomeComponent },
			{ path: '**', component: HomeComponent },
		]
	},
	{
		path: '', component: ClientLayoutComponent, canActivate: [],
		children: [
			{ path: 'notfound', component: PageNotFoundComponent },
			{ path: 'home', component: HomeComponent },
			{ path: '**', component: HomeComponent },
		]
	},
	{
		path: '', component: AnonymousLayoutComponent, canActivate: [!AuthGuard],
		children: [
			{ path: 'login', component: LoginComponent },
			{ path: 'singin', component: RegisterComponent },
			{ path: '**', component: LoginComponent },
		]
	}
]

const newRoutes: Routes = [
	{
		path: '', component: AuthenticatedLayoutComponent, canActivate: [AuthGuard],
		children: [
			{ path: 'home', component: HomeComponent },
			{ path: '**', component: HomeComponent },
		]
	},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }