import { Component, OnInit } from '@angular/core';
import { Observation, typeObs } from 'src/app/models/observation.interface';
import { ObservationService } from 'src/app/services/observation/observation.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { MenuComponent } from '../../menu/menu.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GlobalHandlerService } from 'src/app/services/global-handler.service';
import { Cow } from 'src/app/models/cow.interface';
import { CowService } from 'src/app/services/cow/cow.service';
import { TypeObsService } from 'src/app/services/typeObs/type-obs.service';
import { UtilCow } from 'src/app/services/util/cow.util';

@Component({
  selector: 'app-create-observation',
  templateUrl: './create-observation.component.html',
  styleUrls: ['./create-observation.component.css'],
  providers: [MessageService, MenuComponent]
})
export class CreateObservationComponent implements OnInit {

  obs: Observation;
  submitted: boolean;

  cows: Cow[];
  types: typeObs[];

  setting = {
    title: "Crear Observación",
    titleButton: "Guardar"
  }

  constructor(private _obsService: ObservationService,
    private primeNGConfig: PrimeNGConfig,
    private _router: Router,
    private _route: ActivatedRoute,
    private _handlerService: GlobalHandlerService,
    private _cowService: CowService,
    private _typesService: TypeObsService) {
    this.primeNGConfig.ripple = true;
  }

  ngOnInit(): void {
    this.openObs();
    this._route.params.subscribe((res: Params) => {
      if (res.id) {
        this._obsService.getObservationById(res.id).subscribe((obs: Observation) => {
          this.obs = obs;
          this.setting.title = 'Actualizar Observación';
          this.setting.titleButton = 'Actualizar';
        })
      }
    });


    this._typesService.getTypesObservations().subscribe(types => this.types = types);

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

  openObs(): void {
    this.obs = {
      cow: {
        cowName: "",
        cowActive: false,
        cowId: 1
      },
      observationDate: "",
      observationDescription: "",
      observationId: 0,
      observationPrice: "",
      type: {
        typeId: 2,
        typeName: ""
      }
    };
  }

  onSave() {
    console.log(this.obs);
    this.submitted = true;
    const isObsValid = UtilCow.isCompleteObs(this.obs);

    if (!isObsValid) {
      return;
    }

    if (this.setting.titleButton === 'Guardar') {
      this._obsService.newObservation(this.obs).subscribe(response => {

        if (response) {
          this._handlerService._message = {
            summary: 'Aviso',
            detail: 'Registro agreado',
            severity: 'success'
          }
          this._router.navigate(['/observations']);
        }
      })
    } else {
      this._obsService.updateObservation(this.obs).subscribe(response => {
        if (response) {
          this._handlerService._message = {
            summary: 'Aviso',
            detail: 'Refistro actualizado',
            severity: 'info'
          }
          this._router.navigate(['/observations']);
        }
      })
    }
  }

  onCancel() {
    this._handlerService._message = {
      summary: 'Aviso',
      detail: 'Se canceló la operación',
      severity: 'warn'
    }
    this._router.navigate(['/observations']);
  }

  filterCountry(event) {
    let query = event.query;
    this._cowService.getMatchingCowsByValue(query).subscribe(cows => {
      console.log(cows);
      this.cows = cows;
    })

  }
}
