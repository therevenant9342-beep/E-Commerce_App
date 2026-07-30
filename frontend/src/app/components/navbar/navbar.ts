import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink], 
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  constructor(public cartService: CartService) {}
}