import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ZXingScannerComponent } from "@zxing/ngx-scanner";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {map} from "rxjs/operators";
import {LaboratoriesService} from "../laboratories.service";
import {text} from "@fortawesome/fontawesome-svg-core";
import {BarcodeFormat} from "@zxing/library";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-request-repair',
  templateUrl: './request-repair.component.html',
  styleUrls: ['./request-repair.component.scss']
})
export class RequestRepairComponent implements OnInit, OnDestroy {

  @ViewChild('scanner')
  scanner: ZXingScannerComponent | undefined;

  allowedFormats = [ BarcodeFormat.QR_CODE ];

  repairForm: FormGroup;

  availableDevices: MediaDeviceInfo[] | any;

  currentDevice: MediaDeviceInfo | any = null;

  hasDevices: boolean | undefined;

  hasPermission: boolean | undefined;

  idComputer: string = '';

  showSpinner: boolean = false;

  showScan: boolean = true;

  agree: boolean = false;

  user: any

  errorMessageResources = {
    comment: {
      required: 'Comment is required.',
      minlength: 'Cannot be less than 20 characters.',
      maxlength: 'It can not be longer than 100 characters.'
    },
    agree: {
      required: 'Is required.',
    }
  };

  constructor(
    public laboratoriesService: LaboratoriesService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.hasPermission = true;
    this.authService.user.subscribe(res => { this.user = res });
    this.repairForm = this.formBuilder.group({
      comment: [null, Validators.compose([
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(100)
      ])],
      agree: [this.agree]
    });
  }

  clearResult(): void{
    console.log("CLear Result");
    this.idComputer = '';
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    console.log("Cameras Found", devices);
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    console.log("Code Result: ", resultString);
    this.idComputer = resultString;
    this.showScan = false;
  }

  camerasNotFound(event: Event) {
    console.log(event);
  }

  onDeviceSelectChange(selected: any) {
    console.log(selected)
    console.log("Device Select Change", selected);
    const device = this.availableDevices.find((x:any) => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
    console.log("Permission", has);
  }

  onSubmit() {
    if (this.repairForm.valid) {
      this.showSpinner = !this.showSpinner;
      const data = {
        computer: this.idComputer,
        comment: this.repairForm.value.comment,
        user: this.user.uid
      }
      this.laboratoriesService
        .requestRepair(
          `${this.idComputer}`,
          `${this.repairForm.value.comment}`,
          `${this.user.uid}`)
        .then(res => {
          this.showSpinner = false;
          this.router.navigate(['/dashboard']).catch(err => err.message);
          res.subscribe(res => {
            res.forEach(res => {
              if (res.status === 1) {
                this.snackBar
                  .open(`${res.message}`, '', {duration: 3000, panelClass: 'green-snackbar' } );
              } else if (res.status === 2 ) {
                this.snackBar
                  .open(`${res.message}`, '', {duration: 3000, panelClass: 'orange-snackbar' } );
              } else if (res.status === 3) {
                this.snackBar
                  .open(`${res.message}`, '', {duration: 3000, panelClass: 'red-snackbar' } );
              }
            } )
          })
        })
        .catch(err => err.message);
    }
  }

  /* async getMaintenances() {
    return collectionSnapshots(query(
      collectionGroup(this.firestore, 'computers'), where('maintenance.status', '==', true)))
      .pipe(map(res => res.map( computer => {
        console.log(computer);
        return computer
      } ) ) );
  }*/

  ngOnInit(): void {}

  ngOnDestroy(): void {}

}
