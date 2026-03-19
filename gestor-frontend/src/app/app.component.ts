import { Component } from '@angular/core';

export type AppView = 'dashboard' | 'gastos' | 'reportes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'GestorPro';
  activeView: AppView = 'dashboard';

  onNavChange(view: AppView) {
    this.activeView = view;
  }
}
