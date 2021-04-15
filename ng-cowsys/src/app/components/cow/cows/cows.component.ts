import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, PrimeNGConfig, MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Cow } from 'src/app/models/cow.interface';
import { CowService } from 'src/app/services/cow/cow.service';
import { GlobalHandlerService } from 'src/app/services/global-handler.service';

@Component({
  selector: 'app-cows',
  templateUrl: './cows.component.html',
  styleUrls: ['./cows.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CowsComponent implements OnInit {

  cows: Cow[];
  loading: boolean;
  totalRecords: number = 0;
  lazyLoad = {
    take: 0,
    skip: 0
  }

  constructor(private _cowService: CowService,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _handlerService: GlobalHandlerService
  ) {
    this.loading = true;

  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  loadCows(event: LazyLoadEvent): void {
    this.loading = true;
    this._cowService.getCount().subscribe(res => this.totalRecords = res);
    this._cowService.getCowsForLazyLoading(event.rows, event.first).subscribe((cows => {
      this.cows = cows;
      this.loading = false;
      if (this._handlerService._message.severity !== "") {
        this.messageService.add(this._handlerService._message);
        this._handlerService._message = { severity: '', summary: '', detail: "" };
      }


      this.lazyLoad = {
        take: event.rows,
        skip: event.first
      }

    }));
  }


  onActive(cow: Cow): void {
    this.loading = true;
    this._cowService.updateActive(!cow.cowActive, cow.cowId).subscribe(response => {
      if (response) {
        this._cowService.getCowsForLazyLoading(this.lazyLoad.take, this.lazyLoad.skip).subscribe((cows => {
          this.cows = cows;
          this.loading = false;
          this.messageService.add({ severity: 'success', summary: 'Aviso', detail: 'Acción realiza con exito' });
        }))
      }
    })
  }

  onEnter(value: string): void {
    console.log(value);
    this.loading = true;
    this._cowService.getMatchingCowsByValue(value).subscribe((cows => {
      this.totalRecords = cows.length;
      this.cows = cows;
      this.loading = false;
    }))
  }

  onDelete(id: number): void {
    this.confirmationService.confirm({
      message: '¿Desea eliminar el registro?',
      header: 'Confirmación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading = true;
        this._cowService.deleteCow(id).subscribe({
          next: response => {
            this._cowService.getCount().subscribe(res => this.totalRecords = res);
            this._cowService.getCowsForLazyLoading(this.lazyLoad.take, this.lazyLoad.skip).subscribe((cows => {
              this.cows = cows;
              this.loading = false;
              this.messageService.add({ severity: 'info', summary: 'Eliminado', detail: 'Vaca eliminada correctamente' });
            }))
          }, error: error => {
            this.loading = false;
            this.messageService.add({ severity: 'error', summary: 'Negación', detail: 'No se puede eliminar, la vaca contiene otros registros', });
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
