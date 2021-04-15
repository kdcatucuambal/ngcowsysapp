
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { UserCredentials, UserRegister, UserResponse } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CowService } from 'src/app/services/cow/cow.service';
import { UtilCow } from "./../../services/util/cow.util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  displayBasic: boolean;

  submitted: boolean;
  submittedRegister: boolean;

  user: UserCredentials = { email: '', password: '' };
  userRegister: UserRegister;



  constructor(
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private _authService: AuthService,
    private _router: Router) { }


  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }


  onLogin(): void {
    this.submitted = true;
    if (this.user.email === '' || this.user.password === '') {
      this.showMessage({
        severity: 'error',
        summary: 'Error de login',
        detail: 'Las credenciales están vacias'
      });
      return;
    }
    this._authService.login(this.user).subscribe({
      next: (res => {
        if (res) {
          console.log(res);
          this._router.navigate(['/home']);
        }
      }),
      error: (err => {
        this.showMessage({
          severity: 'error',
          summary: 'Error de login',
          detail: 'Las credenciales no son correctas',
          data: err
        });
      }),
      complete: () => console.log('Terminado')
    })
  }

  onRegister(): void {
    this.submittedRegister = true;

    const isValidUser = UtilCow.isCompleteUserRegister(this.userRegister);

    if (!isValidUser) {
      return;
    }

    this._authService.create(this.userRegister).subscribe({
      next: () => {
        this.displayBasic = false;
        this.showMessage({
          severity: 'success',
          summary: 'Usuario creado!',
          detail: 'Registrese con su usuario y contraseña'
        })
      },
      error: (err) => {
        console.log(err);
      }
    });


  }


  openNewUser() {
    this.user = { email: '', password: '' };
    this.userRegister = { email: '', password: '', cofirmPassword: '', name: '', lastname: '' }
    this.showBasicDialog();
    this.submitted = false;
    this.submittedRegister = false;
  }

  showMessage(message: Message): void {
    this.messageService.add({
      severity: message.severity,
      summary: message.summary,
      detail: message.detail
    });
  }


  showBasicDialog() {
    this.displayBasic = true;
  }



}
