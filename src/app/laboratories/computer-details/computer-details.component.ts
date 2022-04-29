import { Component, OnInit } from '@angular/core';
import { LaboratoriesService } from "../laboratories.service";
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from "rxjs/operators";
import { faServer, faNetworkWired, faTools, faHdd, faMemory, faMicrochip, faCodeBranch, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { faWindows } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-computer-details',
  templateUrl: './computer-details.component.html',
  styleUrls: ['./computer-details.component.scss']
})
export class ComputerDetailsComponent implements OnInit {

  public faServer = faServer;
  public faTools = faTools;
  public faHdd = faHdd;
  public faMicrochip = faMicrochip;
  public faDesktop = faDesktop;
  public faWindows = faWindows;
  public faMemory = faMemory;
  public faNetworkWired = faNetworkWired;
  public faCodeBranch = faCodeBranch;

  public computer;
  public laboratory;

  public point: boolean = false;

  private memSize = 0;
  private memClock = 0;
  private memType = '';
  private memSerial = '';

  cards = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(({ matches }) => {
      this.point = matches;
      if (!matches) {
        return [
          {
            title: 'SYSTEM',
            cols: 1,
            rows: 1,
            data: [
              'Manufacturer: '+this.computer.system.manufacturer,
              'Serial: '+this.computer.system.serial,
              'Model: '+this.computer.system.model,
              'UUID: '+this.computer.id
            ],
            icon: this.faServer
          },
          {
            title: 'O.S.',
            cols: 1,
            rows: 1,
            data:  [
              'Distro: '+this.computer.os.distro,
              'Hostname: '+this.computer.os.hostname,
              'Serial: '+this.computer.os.serial,
              'Release: '+this.computer.os.release,
            ],
            icon: this.faWindows
          },
          {
            title: 'GRAPHICS',
            cols: 1,
            rows: 1,
            data:  [
              'Model: '+this.computer.graphics.controllers[0].model,
              'VRAM: '+this.computer.graphics.controllers[0].vram+'MB',
              'Resolution :'+this.computer.graphics.displays[0].resolutionX+' x '+this.computer.graphics.displays[0].resolutionY,
            ],
            icon: this.faDesktop
          },
          {
            title: 'MEMORY',
            cols: 1,
            rows: 1,
            data: [
              'Size: '+this.memSize+' GB',
              'Speed: '+this.memClock,
              'Type: '+this.memType,
              'Serial: '+this.memSerial,
            ],
            icon: this.faMemory
          },
          {
            title: 'HARD DISK',
            cols: 1,
            rows: 1,
            data:  [
              'Size: '+this.computer.diskLayout[0].size,
              'Vendor: '+this.computer.diskLayout[0].vendor,
              'Type: '+this.computer.diskLayout[0].type,
              'Serial: '+this.computer.diskLayout[0].serialNum

            ],
            icon: this.faHdd
          },
          {
            title: 'CPU',
            cols: 1,
            rows: 1,
            data: [
              'Brand: '+this.computer.cpu.brand,
              'Speed: '+this.computer.cpu.speed+' GHz',
              'Socket: '+this.computer.cpu.socket,
              'Cores: '+this.computer.cpu.cores
            ],
            icon: this.faMicrochip
          },
          {
            title: 'NET',
            cols: 1,
            rows: 1,
            data: [
              'IP Address: '+this.computer.net[0].ip4,
              'MAC Address: '+this.computer.net[0].mac,
              'Interface: '+this.computer.net[0].ifaceName,
              'Type: '+this.computer.net[0].type,
            ],
            icon: this.faNetworkWired
          },
          {
            title: 'VERSIONS',
            cols: 1,
            rows: 1,
            data: [
              'Python: '+this.computer.versions.python,
              'NodeJS: '+this.computer.versions.node,
              'Java: '+this.computer.versions.java,
            ],
            icon: this.faCodeBranch
          }
        ];
      } else {
        return [
          {
            title: 'SYSTEM',
            cols: 4,
            rows: 1,
            data: [
              'Manufacturer: '+this.computer.system.manufacturer,
              'Serial: '+this.computer.system.serial,
              'Model: '+this.computer.system.model,
              'UUID: '+this.computer.id
            ],
            icon: this.faServer
          },
          {
            title: 'O.S.',
            cols: 4,
            rows: 1,
            data:  [
              'Distro: '+this.computer.os.distro,
              'Hostname: '+this.computer.os.hostname,
              'Serial: '+this.computer.os.serial,
              'Release: '+this.computer.os.release,
            ],
            icon: this.faWindows
          },
          {
            title: 'GRAPHICS',
            cols: 4,
            rows: 1,
            data:  [
              'Model: '+this.computer.graphics.controllers[0].model,
              'VRAM: '+this.computer.graphics.controllers[0].vram+'MB',
              'Resolution :'+this.computer.graphics.displays[0].resolutionX+' x '+this.computer.graphics.displays[0].resolutionY,
            ],
            icon: this.faDesktop
          },
          {
            title: 'MEMORY',
            cols: 4,
            rows: 1,
            data: [
              'Size: '+this.memSize+' GB',
              'Speed: '+this.memClock,
              'Type: '+this.memType,
              'Serial: '+this.memSerial,
            ],
            icon: this.faMemory
          },
          {
            title: 'HARD DISK',
            cols: 4,
            rows: 1,
            data:  [
              'Size: '+this.computer.diskLayout[0].size,
              'Vendor: '+this.computer.diskLayout[0].vendor,
              'Type: '+this.computer.diskLayout[0].type,
              'Serial: '+this.computer.diskLayout[0].serialNum

            ],
            icon: this.faHdd
          },
          {
            title: 'CPU',
            cols: 4,
            rows: 1,
            data: [
              'Brand: '+this.computer.cpu.brand,
              'Speed: '+this.computer.cpu.speed+' GHz',
              'Socket: '+this.computer.cpu.socket,
              'Cores: '+this.computer.cpu.cores
            ],
            icon: this.faMicrochip
          },
          {
            title: 'NET',
            cols: 4,
            rows: 1,
            data: [
              'IP Address: '+this.computer.net[0].ip4,
              'MAC Address: '+this.computer.net[0].mac,
              'Interface: '+this.computer.net[0].ifaceName,
              'Type: '+this.computer.net[0].type,
            ],
            icon: this.faNetworkWired
          },
          {
            title: 'VERSIONS',
            cols: 4,
            rows: 1,
            data: [
              'Python: '+this.computer.versions.python,
              'NodeJS: '+this.computer.versions.node,
              'Java: '+this.computer.versions.java,
            ],
            icon: this.faCodeBranch
          }
        ];
      }
    } ) );

  constructor( private breakpointObserver: BreakpointObserver, private laboratoriesService: LaboratoriesService)
  {
    this.computer = JSON.parse(`${this.laboratoriesService.getItem('computer')}`);
    this.laboratory = JSON.parse(`${this.laboratoriesService.getItem('laboratory')}`);
    this.getMem(this.computer);
  }

  saveComputer(computer: any){
    let a = document.createElement("a");
    let file = new Blob([JSON.stringify(computer, null, 4)], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = `computer-${computer.id}.json`;
    a.click();
  }

  getMem(computer: any) {
    const count = Object.keys(this.computer.memLayout).length;
    computer.memLayout.map((res: any) => {
      this.memSize += ((res.size/1024)/1024)/1024;
      this.memSerial +=' - ' +res.serialNum;
      this.memClock += res.clockSpeed/count;
      this.memType = res.type;
    });
  }

  ngOnInit(): void { };

}

