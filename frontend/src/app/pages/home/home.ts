import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product/product'; 
import { CartService } from '../../services/cart/cart';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  trendingProducts: Product[] = [];
  currentSlide = 0;
  
  slides = [
    { image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070', title: 'Welcome to E-Commerce', subtitle: 'Discover the best products at unbeatable prices.' },
    { image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070', title: 'New Season Arrivals', subtitle: 'Shop the latest tech and trends.' },
    { image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070', title: 'Exclusive Offers', subtitle: 'Up to 50% off on selected categories.' }
  ];

  newsArticles = [
    { 
      title: 'Level Up Your Setup', 
      excerpt: 'Explore our electronics lineup featuring 49-Inch Curved Gaming Monitors and high-speed SSDs.', 
      date: 'July 25, 2026' 
    },
    { 
      title: 'Prepare for the Outdoors', 
      excerpt: 'Stay warm this season with our new collection of heavy cotton and 3-in-1 snowboard jackets.', 
      date: 'July 28, 2026' 
    },
    { 
      title: 'Timeless Jewelry Pieces', 
      excerpt: 'Discover elegant accessories like the Legends Naga Gold & Silver Dragon Bracelet.', 
      date: 'July 30, 2026' 
    }
  ];

  authService = inject(AuthService);
  router = inject(Router);
  productService = inject(ProductService);
  cartService = inject(CartService); 
  toastr = inject(ToastrService); 
  cdr = inject(ChangeDetectorRef);
  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        console.log('Raw API Data:', data);
        this.trendingProducts = data.slice(0, 4);
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  addToCart(product: Product, event: Event) {
  event.stopPropagation();

  this.cartService.addToCart(product).subscribe({
    next: (res) => {
      this.toastr.success('Item added to cart!', 'Success');
    },
    error: (err) => console.error(err)
  });
}
}