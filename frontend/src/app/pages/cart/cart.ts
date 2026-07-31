import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {
  cartService = inject(CartService);

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  changeQuantity(productId: string, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newQuantity = Number(inputElement.value);
    if (newQuantity > 0) {
      this.cartService.updateQuantity(productId, newQuantity);
    }
  }
}