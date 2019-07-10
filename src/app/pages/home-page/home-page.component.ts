import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private auth: AuthService,
    private api: ApiService
  ) {
  }

  ngOnInit() {
  }

  onLogIn(user) {
    this.api.login(user.email, user.password)
      .subscribe(
        (response) => {
          this.auth.signInUser(response);
          this.router.navigate(['/dashboard']);
        },
        error => {
          // this.alertService.error(error);
        });
  }
}
