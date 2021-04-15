import { Component, forwardRef, Host, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Cow } from 'src/app/models/cow.interface';
import { CowService } from 'src/app/services/cow/cow.service';
import { GlobalHandlerService } from 'src/app/services/global-handler.service';
import { UtilCow } from 'src/app/services/util/cow.util';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-create-cow',
  templateUrl: './create-cow.component.html',
  styleUrls: ['./create-cow.component.css'],
  providers: [MessageService, MenuComponent]
})
export class CreateCowComponent implements OnInit {

  submitted: boolean;

  cow: Cow = {
    cowId: 0,
    cowName: "",
    cowRace: "",
    cowBirthDate: "",
    cowBuyDate: "",
    cowPrice: "",
    cowDescription: "",
    cowImage: "",
    cowActive: true
  };

  setting = {
    title: 'Nueva Vaca',
    titleButton: 'Guardar'
  }


  constructor(
    private primeNGConfig: PrimeNGConfig,
    private _cowService: CowService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _handlerService: GlobalHandlerService
  ) {
    this.primeNGConfig.ripple = true;
  }

  ngOnInit(): void {
    this._route.params.subscribe((res: Params) => {
      if (res.id) {
        this._cowService.getCowById(res.id).subscribe((cow: Cow) => {
          this.cow = cow;
          this.setting.title = "Actualizar Vaca";
          this.setting.titleButton = "Actualizar";
        })
      }
    });

    this.primeNGConfig.setTranslation(
      {
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'],
        dayNamesMin: ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        today: 'Hoy',
        clear: 'Limpiar',
      }
    );
  }

  onSave(): void {

    this.submitted = true;
    console.log(this.cow);
    const isCowValid = UtilCow.isCompleteCow(this.cow);
    if (!isCowValid) {
      return;
    }

    if (this.setting.titleButton === 'Guardar') {
      this._cowService.newCow(this.cow).subscribe((response) => {
        if (response) {
          this._handlerService._message = {
            summary: 'Aviso',
            detail: 'Nueva vaca agregada',
            severity: 'success'
          }
          this._router.navigate(['/cows']);
        }
      });
    } else {
      this._cowService.updateCow(this.cow).subscribe((response) => {
        if (response) {
          this._handlerService._message = {
            summary: 'Aviso',
            detail: 'Vaca actualizada',
            severity: 'info'
          }
          this._router.navigate(['/cows']);
        }
      })
    }

  }

  onCancel(): void {
    this._handlerService._message = {
      summary: 'Aviso',
      detail: 'Se canceló la operación',
      severity: 'warn'
    }
    this._router.navigate(['/cows']);
  }

}
