import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/payment.interface';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { PrimeNGConfig, MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { GlobalHandlerService } from 'src/app/services/global-handler.service';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class PaymentsComponent implements OnInit {

  pays: Payment[];
  constructor(private _payService: PaymentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _handlerService: GlobalHandlerService) { }

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(): void {
    this._payService.getPayments().subscribe(pays => {
      if (pays) {
        this.pays = pays;
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
      message: '¿Está seguro de eliminar el registro y sus subregistros?',
      header: 'Confirmación',
      icon: 'pi pi-info-circle',
      acceptLabel: "Si",
      accept: () => {
        this._payService.deletePayment(id).subscribe({
          next: response => {
            console.log(response);
            this.getPayments();
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
