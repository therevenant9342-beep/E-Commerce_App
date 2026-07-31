import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { CartService } from './services/cart/cart'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'frontend';

  cartService = inject(CartService);

  ngOnInit() {
    const token = localStorage.getItem('token');
    
    if (token) {
      this.cartService.getCart();
    }
  }
}