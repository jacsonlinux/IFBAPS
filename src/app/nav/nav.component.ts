import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {filter, Observable} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../auth.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isLoggedIn$: Observable<boolean> | undefined;
  title: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private titleService: Title,
    public authService: AuthService,
    private breakpointObserver: BreakpointObserver) {

    const appTitle = this.titleService.getTitle();

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          if (child?.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          return appTitle;
        })
      ).subscribe((title: string) => {
      this.title = title
      this.titleService.setTitle(title);
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe( map(result => result.matches), shareReplay() );

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

}
