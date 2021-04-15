import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CowsComponent } from './components/cow/cows/cows.component';
import { CreateCowComponent } from './components/cow/create-cow/create-cow.component';
import { ViewCowComponent } from './components/cow/view-cow/view-cow.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { CreateObservationComponent } from './components/observation/create-observation/create-observation.component';
import { ObservationsComponent } from './components/observation/observations/observations.component';
import { CreatePaymentComponent } from './components/payment/create-payment/create-payment.component';
import { PaymentsComponent } from './components/payment/payments/payments.component';
import { RecordsComponent } from './components/record/records/records.component';
import { InputOutputComponent } from './components/test/input-output/input-output.component';
import { AuthRejectLoginGuard } from './shared/guards/auth-reject-login.guard';
import { AuthReturnLoginGuard } from './shared/guards/auth-return-login.guard';

const routes: Routes = [
  {
    path: "user", component: InputOutputComponent,
    canActivate: [AuthReturnLoginGuard]
  },
  {
    path: 'login', component: LoginComponent,
    canActivate: [AuthRejectLoginGuard]
  },
  {
    path: '', component: LoginComponent,
    canActivate: [AuthRejectLoginGuard]
  },
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthReturnLoginGuard]
  },
  {
    path: 'cows', component: CowsComponent,
    canActivate: [AuthReturnLoginGuard]
  },
  {
    path: 'cows-create', component: CreateCowComponent,
    canActivate: [AuthReturnLoginGuard]
  },
  {
    path: 'cows-edit/:id', component: CreateCowComponent,
    canActivate: [AuthReturnLoginGuard]
  },
  {
    path: 'cows-view/:id', component: ViewCowComponent,
    canActivate: [AuthReturnLoginGuard]
  },
  {
    path: 'records', component: RecordsComponent,
    canActivate: [AuthReturnLoginGuard]
  },
  {
    path: 'observations', component: ObservationsComponent,
    canActivate: [AuthReturnLoginGuard]
  },
  {
    path: 'observations-create', component: CreateObservationComponent,
    canActivate: [AuthReturnLoginGuard]
  },
  {
    path: 'observations-edit/:id', component: CreateObservationComponent,
    canActivate: [AuthReturnLoginGuard]
  },
  {
    path: 'payments', component: PaymentsComponent,
    canActivate: [AuthReturnLoginGuard]
  },
  {
    path: 'payments-create', component: CreatePaymentComponent,
    canActivate: [AuthReturnLoginGuard]
  },
  {
    path: 'payments-view/:id', component: CreatePaymentComponent,
    canActivate: [AuthReturnLoginGuard]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
