import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../models/product.model';
export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  cartTotal = computed(() => {
    return this.cartItems().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  });

  itemCount = computed(() => {
    return this.cartItems().reduce((count, item) => count + item.quantity, 0);
  });

  addToCart(product: Product) {
    this.cartItems.update(items => {
      const existingItem = items.find(i => i.product._id === product._id);
      if (existingItem) {
        existingItem.quantity += 1;
        return [...items];
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  removeFromCart(productId: string) {
    this.cartItems.update(items => items.filter(item => item.product._id !== productId));
  }

  updateQuantity(productId: string, quantity: number) {
    this.cartItems.update(items => {
      const item = items.find(i => i.product._id === productId);
      if (item) {
        item.quantity = quantity;
      }
      return [...items];
    });
  }
}