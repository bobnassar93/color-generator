import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Color Generator', url: '/color-generator/', icon: 'color-palette' },
    { title: 'Shadow Box', url: '/shadow-box/', icon: 'prism' }
  ];
  constructor() {}
}
