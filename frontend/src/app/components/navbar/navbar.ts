import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common'; 
import { AuthService } from '../../services/auth/auth';
import { CartService } from '../../services/cart/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, AsyncPipe], 
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  authService = inject(AuthService);
  cartService = inject(CartService);
  isLoggedIn$ = this.authService.isLoggedIn$;

  logout() {
    this.authService.logout();
  }
}