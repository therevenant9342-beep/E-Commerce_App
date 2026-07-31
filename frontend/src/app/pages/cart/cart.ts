import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {
  cartService = inject(CartService);
  toastr = inject(ToastrService);

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  changeQuantity(item: any, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let newQuantity = Number(inputElement.value);
    const maxStock = item.product.stock || 0;

    if (newQuantity > maxStock) {
      this.toastr.warning(`Only ${maxStock} items available in stock.`, 'Stock Limit Reached');
      newQuantity = maxStock;
      inputElement.value = String(maxStock); 
    }

    if (newQuantity > 0) {
      this.cartService.updateQuantity(item.product._id, newQuantity);
    }
  }
}