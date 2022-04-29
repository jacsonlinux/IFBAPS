import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboratoriesRoutingModule } from './laboratories-routing.module';
import { LaboratoriesComponent } from './laboratories.component';
import {LaboratoriesListComponent} from "./laboratories-list/laboratories-list.component";
import {ComputerListComponent} from "./computer-list/computer-list.component";
import {ComputerDetailsComponent} from "./computer-details/computer-details.component";
import {RequestRepairComponent} from "./request-repair/request-repair.component";
import {ComputerScanComponent} from "./computer-scan/computer-scan.component";
import {RepairListComponent} from "./repair-list/repair-list.component";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    LaboratoriesComponent,
    LaboratoriesListComponent,
    ComputerListComponent,
    ComputerDetailsComponent,
    RequestRepairComponent,
    ComputerScanComponent,
    RepairListComponent
  ],
  imports: [
    CommonModule,
    LaboratoriesRoutingModule,
    MatListModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    ZXingScannerModule,
    MatCheckboxModule,
    MatSnackBarModule
  ]
})
export class LaboratoriesModule { }
