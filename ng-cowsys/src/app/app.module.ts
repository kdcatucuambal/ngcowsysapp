import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputOutputComponent } from './components/test/input-output/input-output.component';
import { InputOutputChildComponent } from './components/test/input-output-child/input-output-child.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimengModule } from "./modules/primeng/primeng.module";
import { LoginComponent } from "./components/login/login.component";
import { MenuComponent } from "./components/menu/menu.component";
import { FormsModule } from '@angular/forms';
import { CowsComponent } from './components/cow/cows/cows.component';
import { TokenInterceptorInterceptor } from './shared/interceptors/token-interceptor.interceptor';
import { CreateCowComponent } from './components/cow/create-cow/create-cow.component';
import { ObservationsComponent } from './components/observation/observations/observations.component';
import { CreateObservationComponent } from './components/observation/create-observation/create-observation.component';
import { ViewCowComponent } from './components/cow/view-cow/view-cow.component';
import { RecordsComponent } from './components/record/records/records.component';
import { PaymentsComponent } from './components/payment/payments/payments.component';
import { CreatePaymentComponent } from "./components/payment/create-payment/create-payment.component";
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    InputOutputComponent,
    InputOutputChildComponent,
    LoginComponent,
    MenuComponent,
    CowsComponent,
    CreateCowComponent,
    ObservationsComponent,
    CreateObservationComponent,
    ViewCowComponent,
    RecordsComponent,
    PaymentsComponent,
    CreatePaymentComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PrimengModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
