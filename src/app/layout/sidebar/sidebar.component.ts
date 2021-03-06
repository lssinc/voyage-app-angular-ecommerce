import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from '../../core/user/user.service';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input()
  set isMobile(isMobile: boolean) {
    this.mobile = isMobile;
    if (!this.sidenav) {
      return;
    }
    if (this.mobile) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
      this.userService.emitIsMenuShowing(false);
    }
  }
  @Input()
  isAuthenticated = false;
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  mobile: boolean;
  toggleTheme: false;
  isAdmin = false;
  isVerificationRequired = false;

  constructor(private userService: UserService, public themeService: ThemeService) { }

  ngOnInit(): void {
    this.userService.verificationChanged$
      .subscribe(value => {
        this.isVerificationRequired = value;
      });

    this.userService.authenticationChanged$
      .subscribe(isAuthenticated => {
        if (isAuthenticated != null) {
          this.isAuthenticated = isAuthenticated;
          if (this.isAuthenticated) {
            this.getCurrentUser();
          }
        }
      });
  }

  toggle(): void {
    this.sidenav.toggle();
  }

  close(): void {
    if (!this.mobile) {
      return;
    }
    this.sidenav.close();
  }

  toggleSidebar(showMenu: boolean): void {
    this.userService.emitIsMenuShowing(showMenu);
  }

  private getCurrentUser(): void {
    this.userService.getCurrentUser()
      .subscribe(user => {
        this.isAdmin = user.roles.indexOf('Administrator') !== -1;
      });
  }
}
