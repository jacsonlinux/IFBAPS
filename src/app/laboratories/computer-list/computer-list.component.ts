import { Component, OnInit } from '@angular/core';
import {LaboratoriesService} from "../laboratories.service";

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {

  public computers: any;

  constructor( private laboratoriesService: LaboratoriesService ) {
    const laboratory = JSON.parse(`${this.laboratoriesService.getItem('laboratory')}`).id;

    this.laboratoriesService.getComputers(laboratory)
      .then(res => { this.computers = res } )
      .catch(err => { console.error(err) } );
  }

  async getComputer(data: object) {
    this.laboratoriesService.setItem('computer', JSON.stringify(data));
  }

  ngOnInit(): void { }
}
