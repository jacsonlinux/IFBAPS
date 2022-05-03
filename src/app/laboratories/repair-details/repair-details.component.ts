import { Component, OnInit } from '@angular/core';
import {LaboratoriesService} from "../laboratories.service";

@Component({
  selector: 'app-repair-details',
  templateUrl: './repair-details.component.html',
  styleUrls: ['./repair-details.component.scss']
})
export class RepairDetailsComponent implements OnInit {
  public computer;
  constructor(private laboratoriesService: LaboratoriesService) {
    this.computer = JSON.parse(`${this.laboratoriesService.getItem('maintenance')}`);
  }

  ngOnInit(): void {
  }

}
