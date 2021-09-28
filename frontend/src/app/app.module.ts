import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginService } from './services/login/login.service';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { CustomizeOrderComponent } from './customize-order/customize-order.component';
import { LocationTimePickerComponent } from './location-time-picker/location-time-picker.component';
import { GenerateRouteComponent } from './generate-route/generate-route.component';
import { RandomDataComponent } from './random-data/random-data.component';
import { DevToolsComponent } from './dev-tools/dev-tools.component';
import { RouteComponent } from './route/route.component';
import { AuthInterceptor } from './http-interceptor';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminRoutesComponent } from './admin-routes/admin-routes.component';
import { DateTranformPipe } from './date-tranform.pipe'
import {MatIconModule} from '@angular/material/icon';
import { RecieveOrdersComponent } from './recieve-orders/recieve-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent,
    AdminDashboardComponent,
    TopBarComponent,
    AddOrderComponent,
    HomeComponent,
    CustomizeOrderComponent,
    LocationTimePickerComponent,
    GenerateRouteComponent,
    RandomDataComponent,
    DevToolsComponent,
    RouteComponent,
    AdminOrdersComponent,
    AdminRoutesComponent,
    DateTranformPipe,
    RecieveOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NgbModule,
    MatIconModule
  ],
  providers: [LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule { }
