import { Component, OnInit } from '@angular/core';
import { LaboratoriesService } from "../laboratories.service";

@Component({
  selector: 'app-repair-list',
  templateUrl: './repair-list.component.html',
  styleUrls: ['./repair-list.component.scss']
})
export class RepairListComponent implements OnInit {

  public computers: any;

  constructor(private laboratoriesService: LaboratoriesService) {
    this.laboratoriesService.getMaintenances()
      .then(res => { this.computers = res })
      .catch(err => console.error(err));
  }

  ngOnInit(): void {
  }
}
