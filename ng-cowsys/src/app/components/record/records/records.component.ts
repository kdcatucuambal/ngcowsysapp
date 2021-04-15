import { Component, OnInit } from '@angular/core';
import { TempRecord } from 'src/app/models/record.interace';
import { RecordsTempService } from 'src/app/services/records-temp/records-temp.service';
import { PrimeNGConfig, MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';


@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class RecordsComponent implements OnInit {

  recs: TempRecord[]
  recEdit: TempRecord = {
    tempRecordDate: "",
    tempRecordAfternoon: 0,
    tempRecordMorning: 0,
    tempRecordDescription: "",
    tempRecordId: 0
  };
  displayBasic: boolean;
  date: string;
  totalLiter: number;
  constructor(private _tempRec: RecordsTempService,
    private primeNGConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {

    this.primeNGConfig.ripple = true;
  }

  ngOnInit(): void {
    this.getRecords();
    
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

  getRecords(): void {
    this._tempRec.getRecords().subscribe((recs: TempRecord[]) => {
      if (recs) {
        this.recs = recs;
        this.calculateTotal();
      }
    })
  }

  newRecord(): void {
    const record =
    {
      tempRecordAfternoon: 0,
      tempRecordMorning: 0,
      tempRecordDescription: "",
      tempRecordDate: this.date,
      tempRecordId: 0
    }
    this._tempRec.newRecord(record).subscribe({
      next: (response) => {
        if (response) {
          this.messageService.add({ severity: 'success', summary: 'Creado!', detail: 'Registro creado correctamente' });
          this.getRecords();
        }

      },
      error: (error) => {
        this.messageService.add({ severity: 'warn', summary: 'Fecha', detail: 'Al parecer ya existe el registro en esa fecha' });
      }
    })

  }


  updateRecord(): void {
    this._tempRec.updateRecord(this.recEdit).subscribe(res => {
      if (res) {
        this.displayBasic = false;
        this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Registro actualizado correctamente' });
        this.getRecords();
      }
    })
  }


  onDelete(id: number): void {

    this.confirmationService.confirm({
      message: '¿Desea eliminar el registro?',
      header: 'Eliminar',
      icon: 'pi pi-info-circle',
      accept: () => {
        this._tempRec.deleteRecord(id).subscribe({
          next: response => {
            this.messageService.add({ severity: 'info', summary: 'Eliminado', detail: 'Registro eliminado correctamente' });
            this.getRecords();
          }, error: error => {
            this.messageService.add({ severity: 'error', summary: 'Negación', detail: 'No se puede eliminar, el registro contiene otros registros', });
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



  openNewRecord(record: TempRecord) {
    this.recEdit =
    {
      tempRecordAfternoon: record.tempRecordAfternoon,
      tempRecordMorning: record.tempRecordMorning,
      tempRecordDescription: record.tempRecordDescription,
      tempRecordDate: record.tempRecordDate,
      tempRecordId: record.tempRecordId

    };
    this.showBasicDialog();
  }

  calculateTotal() {
    this.totalLiter = 0;
    for (const rec of this.recs) {
      this.totalLiter += rec.tempRecordMorning + rec.tempRecordAfternoon;
    }
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

}
