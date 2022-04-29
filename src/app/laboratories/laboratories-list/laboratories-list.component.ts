import { Component, OnInit } from '@angular/core';
import { LaboratoriesService } from "../laboratories.service";
import { AuthService } from "../../auth.service";

import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from "rxjs/operators";
import { faServer, faNetworkWired, faTools, faHdd, faMemory, faMicrochip, faCodeBranch, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { faWindows } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-laboratories-list',
  templateUrl: './laboratories-list.component.html',
  styleUrls: ['./laboratories-list.component.scss']
})
export class LaboratoriesListComponent implements OnInit {

  public faServer = faServer;
  public faTools = faTools;
  public faHdd = faHdd;
  public faMicrochip = faMicrochip;
  public faDesktop = faDesktop;
  public faWindows = faWindows;
  public faMemory = faMemory;
  public faNetworkWired = faNetworkWired;
  public faCodeBranch = faCodeBranch;

  public laboratories: any;
  public point: boolean = false;

  cards = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(({ matches }) => {
      this.point = matches;
      if (!matches) {
        return [
          {
            title: 'SYSTEM',
            cols: 1,
            rows: 1,
            data: [ ],
            icon: this.faServer
          }
        ];
      } else {
        return [
          {
            title: 'SYSTEM',
            cols: 4,
            rows: 1,
            data: [ ],
            icon: this.faServer
          }
        ];
      }
    } ) );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private laboratoriesService: LaboratoriesService )
  {
    this.laboratoriesService
      .getLaboratories()
      .then(res => { this.laboratories = res })
      .catch(err => console.error(err));
  }

  async getLaboratory(data: object) {
    this.laboratoriesService.setItem('laboratory', JSON.stringify(data));
  }

  ngOnInit(): void { }

}
