import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-input-output',
  templateUrl: './input-output.component.html',
  styleUrls: ['./input-output.component.css']
})
export class InputOutputComponent implements OnInit {

  public users = [];
  data: any;

  constructor(
    private _http: HttpClient
  ) {

    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
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
    this._http.get("https://jsonplaceholder.typicode.com/users")
      .subscribe((data: any[]) => this.users = data);
    console.log('Init parent');

  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id != id);
  }

}
