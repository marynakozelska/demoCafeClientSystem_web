import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HomeComponent} from './components/home/home.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {FormsModule} from "@angular/forms";
import {CustomerComponent} from './components/customer/customer.component';
import {HeaderComponent} from './components/header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MenuComponent} from './components/menu/menu.component';
import {AuthGuardService} from "./services/auth-guard.service";
import {CartComponent} from './components/cart/cart.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {ClientsListComponent} from './components/clients-list/clients-list.component';
import {OrdersListComponent} from './components/orders-list/orders-list.component';
import {OrderComponent} from './components/order/order.component';
import {CdkDrag, CdkDropList, DragDropModule} from "@angular/cdk/drag-drop";
import {CommonModule} from "@angular/common";
import {FooterComponent} from './components/footer/footer.component';
import {TokenInterceptor} from "./token.interceptors";
import {SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    CustomerComponent,
    HeaderComponent,
    MenuComponent,
    CartComponent,
    MenuItemComponent,
    ClientsListComponent,
    OrdersListComponent,
    OrderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    CommonModule,
    DragDropModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule,
    RouterModule.forRoot([
        {path: '', component: HomeComponent},
        {path: 'auth/authenticate', component: LoginComponent},
        {path: 'auth/register', component: RegistrationComponent},
        {path: 'profile', component: CustomerComponent},
        {path: 'menu', component: MenuComponent},
        {path: 'menu/manage/add', component: MenuItemComponent},
        {path: 'menu/manage/:id', component: MenuItemComponent},
        {path: 'users/manage', component: ClientsListComponent},
        {path: 'order/manage', component: OrdersListComponent},
        {
          path: 'order/manage/active/',
          children: [
            {path: 'new', component: OrdersListComponent},
            {path: 'process', component: OrdersListComponent},
            {path: 'waiting-payment', component: OrdersListComponent}
          ]
        },
        {path: 'cart', component: CartComponent},
      ],
      {
        anchorScrolling: 'enabled'
      }),
    FormsModule,
    NgbModule,
    CdkDropList,
    CdkDrag,
    GoogleSigninButtonModule
  ],
  providers: [
    AuthGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '911853285501-5o3f3kk0eib6tm9lqatrct9ef46bhp9u.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
