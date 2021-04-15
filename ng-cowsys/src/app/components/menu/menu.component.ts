import { Component, OnInit } from '@angular/core';
import { MenuItem, } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: []
})
export class MenuComponent implements OnInit {

  items: MenuItem[]
  itemsUser: MenuItem[];
  userName: string;
  constructor(private _authService: AuthService,) {
    this.userName = this._authService.userNameValue;
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'COWSYS',
        icon: 'pi pi-home',
        routerLink: ['/home'],
      },
      {
        label: 'Vacas',
        icon: 'pi pi-compass',
        routerLink: ['/cows'],
      },
      {
        label: 'Apuntes',
        icon: 'pi pi-calendar-plus',
        routerLink: ['/records']
      },
      {
        label: 'Pagos',
        icon: 'pi pi-credit-card',
        routerLink: ['/payments']
      },
      {
        label: 'Observaciones',
        icon: 'pi pi-eye',
        routerLink: ['/observations']
      },
      {
        label: 'Compras',
        icon: 'pi pi-shopping-cart',
      }
      ,
      {
        label: 'Productos',
        icon: 'pi pi-th-large',
      },
      {
        label: 'Tipos Obs.',
        icon: 'pi pi-slack',
      }
    ];


    this.itemsUser = [
      {
        label: 'Mi cuenta', icon: 'pi pi-user-edit', command: () => {

        }
      },
      {
        label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => {
          this.onLogout();
        }
      },
    ];

  }

  onLogout(): void {
    this._authService.logout();
  }



}
