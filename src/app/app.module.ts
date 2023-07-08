import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from './components/home/home.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {FormsModule} from "@angular/forms";
import {CustomerComponent} from './components/customer/customer.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './components/menu/menu.component';
import {AuthGuardService} from "./services/auth-guard.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    CustomerComponent,
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'auth/authenticate', component: LoginComponent},
      {path: 'auth/register', component: RegistrationComponent},
      {path: 'profile', component: CustomerComponent},
      {path: 'menu', component: MenuComponent},
    ]),
    FormsModule,
    NgbModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
