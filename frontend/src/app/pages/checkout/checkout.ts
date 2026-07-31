import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent {
  cartService = inject(CartService);
  router = inject(Router);
  toastr = inject(ToastrService);
  http = inject(HttpClient); 

  checkoutForm = new FormGroup({
    fullName: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    cardNumber: new FormControl(null, [Validators.required, Validators.minLength(16)])
  });

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  placeOrder() {
    if (this.checkoutForm.valid) {
      const formValues = this.checkoutForm.value;
      
      const orderPayload = {
        shippingAddress: `${formValues.address}, ${formValues.city}`,
        paymentMethod: 'card' 
      };

      this.http.post('http://localhost:3000/orders', orderPayload, { headers: this.getHeaders() }).subscribe({
        next: (res) => {
          this.toastr.success('Your order has been placed successfully!', 'Success');
          this.cartService.cartItems.set([]); 
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.toastr.error(err.error?.message || 'Failed to process order.', 'Error');
        }
      });
      
    } else {
      this.toastr.error('Please ensure all fields are valid.', 'Checkout Failed');
      this.checkoutForm.markAllAsTouched();
    }
  }
}