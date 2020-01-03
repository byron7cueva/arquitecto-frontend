import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {}

  navigateTo(path) {
    this.router.navigate([path]);
  }

  goToPins() {
    this.navigateTo('/app/pins');
  }

  goToEditMode() {
    this.navigateTo('/app/add');
  }
}
