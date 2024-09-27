import { Component, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs/operators'

import { LoginService } from 'src/app/services/login.service'

@Component({
  selector: 'app-shared',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUrl: string = ''

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUrl()
  }

  logout() {
    if(this.currentUrl === '/user') {
      this.loginService.logout()
      this.getCurrentUrl()
    }
  }

  getCurrentUrl() {
    // Suscribirse a los eventos de finalización de navegación
    this.router.events.pipe(
      // Filtra solo cuando la navegación ha terminado
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Obtiene la URL actual después de navegar
      this.currentUrl = event.urlAfterRedirects
    })
  }
}
