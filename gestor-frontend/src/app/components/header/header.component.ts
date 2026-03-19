import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { AppView } from '../../app.component';

interface NavItem { id: AppView; label: string; }

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit, OnChanges {
  @Input() activeView: AppView = 'dashboard';
  @Output() navChange = new EventEmitter<AppView>();

  @ViewChild('navRef') navRef!: ElementRef<HTMLElement>;

  today = new Date();
  menuOpen = false;

  navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'gastos',    label: 'Gastos' },
    { id: 'reportes',  label: 'Reportes' },
  ];

  indicatorStyle: { left: string; width: string } = { left: '0px', width: '0px' };

  ngAfterViewInit() {
    setTimeout(() => this.updateIndicator(), 50);
  }

  ngOnChanges() {
    setTimeout(() => this.updateIndicator(), 50);
  }

  navigate(id: AppView) {
    this.navChange.emit(id);
    this.menuOpen = false;
  }

  updateIndicator() {
    if (!this.navRef) return;
    const activeEl = this.navRef.nativeElement.querySelector<HTMLElement>('.nav-item--active');
    if (!activeEl) return;
    const navRect = this.navRef.nativeElement.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();
    this.indicatorStyle = {
      left:  `${itemRect.left - navRect.left}px`,
      width: `${itemRect.width}px`,
    };
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
