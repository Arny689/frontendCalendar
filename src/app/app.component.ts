import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  
  showSidemenu = false

  constructor() {}

  toggleSideMenu() {
    this.showSidemenu = !this.showSidemenu
    console.warn(this.showSidemenu);
  }

}
