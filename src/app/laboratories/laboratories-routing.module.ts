import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {LaboratoriesComponent} from "./laboratories.component";
import {LaboratoriesListComponent} from "./laboratories-list/laboratories-list.component";
import {RepairListComponent} from "./repair-list/repair-list.component";
import {RequestRepairComponent} from "./request-repair/request-repair.component";
import {ComputerListComponent} from "./computer-list/computer-list.component";
import {ComputerDetailsComponent} from "./computer-details/computer-details.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '', component: LaboratoriesComponent,
    children : [
      { path: 'laboratories-list',
        component: LaboratoriesListComponent,
        canActivate: [ AuthGuard ],
        data: {
          authGuardPipe: redirectUnauthorizedToLogin,
          title: 'LABORATORIES' }
      },
      { path: 'repair-list',
        component: RepairListComponent,
        canActivate: [ AuthGuard ],
        data: {
          authGuardPipe: redirectUnauthorizedToLogin,
          title: 'REPAIR LIST' }
      },
      { path: 'request-repair',
        component: RequestRepairComponent,
        canActivate: [ AuthGuard ],
        data: {
          authGuardPipe: redirectUnauthorizedToLogin,
          title: 'REQUEST REPAIR' }
      },
      { path: 'computer-list',
        component: ComputerListComponent,
        canActivate: [ AuthGuard ],
        data: {
          authGuardPipe: redirectUnauthorizedToLogin,
          title: 'COMPUTERS' }
      },
      { path: 'computer-details',
        component: ComputerDetailsComponent,
        canActivate: [ AuthGuard ],
        data: {
          authGuardPipe: redirectUnauthorizedToLogin,
          title: 'COMPUTER' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboratoriesRoutingModule { }
