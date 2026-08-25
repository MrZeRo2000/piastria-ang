import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavTopComponent } from './components/nav-top/nav-top.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    NavTopComponent,
    AppHeaderComponent
  ]
})
export class AppComponent {
  title = 'Piastria';

  constructor() { }
}
