import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Observation } from 'src/app/models/observation.interface';
import { GlobalHandlerService } from 'src/app/services/global-handler.service';
import { ObservationService } from 'src/app/services/observation/observation.service';

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ObservationsComponent implements OnInit {

  obs: Observation[];

  constructor(private _obsService: ObservationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _handlerService: GlobalHandlerService) { }

  ngOnInit(): void {
    this.getObservations();
  }

  getObservations(): void {
    this._obsService.getObservations().subscribe(obs => {
      if (obs) {
        this.obs = obs;
        if (this._handlerService._message.severity !== "") {
          this.messageService.add(this._handlerService._message);
          this._handlerService._message = { severity: '', summary: '', detail: "" };
        }
      }
    })
  }

  onEnter(value: string) {

  }
  onDelete(id: number): void {
    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar el registro?',
      header: 'Confirmación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this._obsService.deleteObservation(id).subscribe({
          next: response => {
            this.getObservations();
            this.messageService.add({ severity: 'info', summary: 'Eliminado', detail: 'Registro eliminado correctamente' });
          },
          error: error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se puede eliminar, el registro', });
          }
        })

      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rechazo', detail: 'Ha rechazado la operación' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Ha cancelado la operación' });
            break;
        }
      }
    });
  }
}
