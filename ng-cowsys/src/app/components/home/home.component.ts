import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { RecordsTempService } from 'src/app/services/records-temp/records-temp.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any;

  basicData: any;

  payData: any;

  obsData: any;

  options: any;

  constructor(private _recTempService: RecordsTempService, private _payService: PaymentService) {



    this.data = {
      labels: ['Pecutrin', 'Bal. Lechero', 'Melasa'],
      datasets: [
        {
          data: [10, 100, 20],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };

  }

  ngOnInit(): void {
    this._recTempService.getRecordsForChart().subscribe(recs => {
      const labels: string[] = [];
      const morning: number[] = [];
      const afternoon: number[] = [];
      for (const r of recs) {
        labels.push(r.tempRecordDate);
        morning.push(r.tempRecordMorning);
        afternoon.push(r.tempRecordAfternoon);
      }
      this.basicData = {
        labels: labels.reverse(),
        datasets: [
          {
            label: 'En la mañana',
            backgroundColor: [
              '#EC407A',
              '#EC407A',
              '#EC407A',
              '#EC407A',
              '#EC407A',
              '#EC407A',
              '#EC407A'
            ],
            data: morning.reverse()
          },
          {
            label: 'En la tarde',
            backgroundColor: [
              '#42A5F5',
              '#42A5F5',
              '#42A5F5',
              '#42A5F5',
              '#42A5F5',
              '#42A5F5',
              '#42A5F5'
            ],
            data: afternoon.reverse()
          }
        ]
      }
      this.options = {
        responsive: true,
        tooltips: {
          mode: 'index',
          intersect: true
        },
        scales: {
          yAxes: [{
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            ticks: {
              min: 0,
            }
          }
          ]
        }
      };

    })


    this._payService.getPaymentsForChart().subscribe(pays => {
      const labels: string[] = [];
      const payss: string[] = [];
      for (const p of pays) {
        labels.push(p.paymentDate);
        payss.push(p.paymentTotal.toString());
      }

      this.payData = {
        labels: labels.reverse(),
        datasets: [
          {
            label: 'Pagos en dólares',
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
            ],
            data: payss.reverse()
          },]
      }
    })


    this.obsData = {
      labels: ['Vaca 1', 'Vaca 2', 'Vaca 3', 'Vaca 4'],
      datasets: [
        {
          data: [10, 4, 2, 20],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#088A08"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#088A08"
          ]
        }]
    };

  }

}
