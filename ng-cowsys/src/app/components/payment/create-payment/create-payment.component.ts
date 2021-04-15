import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService, PrimeNGConfig, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Payment } from 'src/app/models/payment.interface';
import { TempRecord } from 'src/app/models/record.interace';
import { GlobalHandlerService } from 'src/app/services/global-handler.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { RecordsTempService } from 'src/app/services/records-temp/records-temp.service';
import { UtilCow } from 'src/app/services/util/cow.util';

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CreatePaymentComponent implements OnInit {

  submitted: boolean;
  pay: Payment;
  recs: TempRecord[] = [];

  setting = {
    title: "Nuevo pago",
    view: false,
    pay: "Por cobrar: "
  }

  constructor(private _recTempService: RecordsTempService,
    private _payService: PaymentService,
    private primeNGConfig: PrimeNGConfig,
    private _router: Router,
    private _route: ActivatedRoute,
    private _handlerService: GlobalHandlerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
    this.primeNGConfig.ripple = true;
  }

  ngOnInit(): void {
    this.resetPay();
    this._route.params.subscribe((res: Params) => {
      if (res.id) {
        this._payService.getPaymentById(res.id).subscribe(pay => {
          this.pay = pay;
          this.recs = pay.records.map(rec => {
            const temp: TempRecord = {
              tempRecordAfternoon: rec.recordAfternoon,
              tempRecordDate: rec.recordDate,
              tempRecordDescription: rec.recordDescription,
              tempRecordId: rec.recordId,
              tempRecordMorning: rec.recordMorning
            }
            return temp;
          })
          this.setting.title = "Detalle de pago: " + pay.paymentDate;
          this.setting.view = true;
          this.setting.pay = "Cobrado: ";
        });
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

  resetPay(): void {
    const now = new Date();
    const dateFormatter = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    this.pay = {
      paymentDate: dateFormatter,
      paymentFromDate: "",
      paymentId: 0,
      paymentLiterValue: 0.43,
      paymentToDate: "",
      paymentTotal: 0,
      paymentTotalLiters: 0,
      records: []
    }
  }

  onSelect() {
    if (this.pay.paymentFromDate == '' || this.pay.paymentToDate == '') {
      return;
    }
    const from = new Date(this.pay.paymentFromDate);
    const to = new Date(this.pay.paymentToDate);
    if (!UtilCow.isFromDateSmallest(from, to)) {
      return;
    }
    const fromDate = UtilCow.getFormattedDate(from);
    const toDate = UtilCow.getFormattedDate(to);
    this._recTempService.
      getRecordsByDates(fromDate, toDate).subscribe(recs => {
        this.recs = recs;
        this.calculateTotal();
        this.pay.paymentTotal = this.calculatePayment();
      });
  }

  onInput() {
    this.pay.paymentTotal = this.calculatePayment();
  }

  onSave() {
    this.submitted = true;
    const res = UtilCow.isCompletePay(this.pay);
    if (!res) {
      this.messageService.add({ severity: "error", summary: 'Error', detail: "Falta llenar campos" })
      return;
    }


    this.confirmationService.confirm({
      message: 'Una vez creado no podrá editar el pago',
      header: '¿Crear pago?',
      icon: 'pi pi-question',
      accept: () => {
        this._payService.newPayment(this.pay).subscribe({
          next: (res) => {
            this._handlerService._message = {
              summary: 'Nuevo',
              detail: 'Nuevo registro agregado',
              severity: 'info'
            }
            this._router.navigate(['/payments']);
          }
        });
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

  onCancel() {
    if (!this.setting.view) {
      this._handlerService._message = {
        summary: 'Aviso',
        detail: 'Se canceló la operación',
        severity: 'warn'
      }
    }

    this._router.navigate(['/payments']);
  }

  calculateTotal() {
    this.pay.paymentTotalLiters = 0;
    for (const rec of this.recs) {
      this.pay.paymentTotalLiters += rec.tempRecordMorning + rec.tempRecordAfternoon;
    }
  }

  calculatePayment(): number {
    const pay = this.pay.paymentTotalLiters * this.pay.paymentLiterValue;
    return Number(pay.toFixed(2));
  }
}
