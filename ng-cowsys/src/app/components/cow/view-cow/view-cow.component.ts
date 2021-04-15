import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Cow } from 'src/app/models/cow.interface';
import { Observation } from 'src/app/models/observation.interface';
import { CowService } from 'src/app/services/cow/cow.service';
import { ObservationService } from 'src/app/services/observation/observation.service';

@Component({
  selector: 'app-view-cow',
  templateUrl: './view-cow.component.html',
  styleUrls: ['./view-cow.component.css']
})
export class ViewCowComponent implements OnInit {

  cow: Cow;
  obs: Observation[];

  constructor(private primeNGConfig: PrimeNGConfig,
    private _cowService: CowService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _obsService: ObservationService) {

  }

  ngOnInit(): void {
    this._route.params.subscribe((res: Params) => {
      if (res.id) {
        this._cowService.getCowById(res.id).subscribe((cow: Cow) => {
          this.cow = cow;
        })

        this._obsService.getObservationsByCow(res.id).subscribe((obs: Observation[]) => {
          console.log(obs);
          if (obs) {
            this.obs = obs;
          }
        })
      }
    });
  }

}
