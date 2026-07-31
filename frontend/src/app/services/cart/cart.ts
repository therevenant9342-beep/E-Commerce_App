// cart.ts
import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { tap } from 'rxjs/operators';

export interface CartItem {
  product: Product;
  quantity: number;
  _id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  http = inject(HttpClient);
  baseUrl = 'http://localhost:3000/cart';

  cartItems = signal<CartItem[]>([]);

  cartTotal = computed(() => {
    return this.cartItems().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  });

  itemCount = computed(() => {
    return this.cartItems().reduce((count, item) => count + item.quantity, 0);
  });

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getCart() {
    this.http.get<{ cart: { cartItems: CartItem[] } }>(this.baseUrl, { headers: this.getHeaders() }).subscribe({
      next: (res) => this.cartItems.set(res.cart?.cartItems || []),
      error: (err) => console.error('Failed to get cart:', err)
    });
  }

  addToCart(product: Product) {
    return this.http.post<{ cart: { cartItems: CartItem[] } }>(
      this.baseUrl, 
      { productId: product._id },
      { headers: this.getHeaders() }
    ).pipe(
      tap(res => this.cartItems.set(res.cart.cartItems))
    );
  }

 removeFromCart(productId: string) {
  this.http.delete<{ cart: { cartItems: CartItem[] } }>(
    `${this.baseUrl}/${productId}`,
    { headers: this.getHeaders() }
  ).subscribe({
    next: () => {
      this.getCart();
    },
    error: (err) => console.error('Failed to remove item:', err)
  });
}

  updateQuantity(productId: string, quantity: number) {
    this.http.put<{ cart: { cartItems: CartItem[] } }>(
      this.baseUrl, 
      { productId, quantity },
      { headers: this.getHeaders() }
    ).subscribe({
      next: (res) => this.cartItems.set(res.cart.cartItems),
      error: (err) => console.error('Failed to update quantity:', err)
    });
  }
}