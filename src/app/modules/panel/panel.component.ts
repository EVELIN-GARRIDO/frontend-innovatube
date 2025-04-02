import { Component } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {
  sidebar: HTMLElement | null;
  closeBtn: HTMLElement | null;
  searchBtn: HTMLElement | null;
  linkSeleccionado = "";
  username: string | null = ''; 

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
  }

  constructor() {
    this.sidebar = null;
    this.closeBtn = null;
    this.searchBtn = null;
  }

  ngAfterViewInit(): void {
    this.sidebar = document.querySelector('.sidebar');
    this.closeBtn = document.querySelector('#btn');

    this.closeBtn?.addEventListener('click', () => {
      this.sidebar?.classList.toggle('open');
      this.menuBtnChange(); 
    });
  }

  menuBtnChange(): void {
    if (this.sidebar?.classList.contains('open')) {
      this.closeBtn?.classList.replace('bx-menu', 'bx-menu-alt-right'); 
    } else {
      this.closeBtn?.classList.replace('bx-menu-alt-right', 'bx-menu');
    }
  }
}
