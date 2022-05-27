import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {faQrcode} from '@fortawesome/free-solid-svg-icons';
import {LaboratoriesService} from "../laboratories/laboratories.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  faQrcode = faQrcode;

  //public computersON: any;

  public computersON$: any;

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 3, rows: 1 },
          { title: 'Card 2', cols: 3, rows: 1 },
          { title: 'Card 3', cols: 3, rows: 1 },
          { title: 'Card 4', cols: 3, rows: 1 },
          { title: 'Card 5', cols: 3, rows: 1 },
          { title: 'Card 6', cols: 3, rows: 1 }
        ];
      }

      return [
        { title: 'Ativos', content: this.computersON$, cols: 1, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 1 },
        { title: 'Card 4', cols: 1, rows: 1 },
        { title: 'Card 5', cols: 1, rows: 1 },
        { title: 'Card 6', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private laboratoriesService: LaboratoriesService) {

    this.computersON$ = this.laboratoriesService.getComputersActive().then(res => res.subscribe(res => res.length));

  }

}
