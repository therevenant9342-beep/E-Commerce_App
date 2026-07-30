import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product/product'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  trendingProducts: any[] = [];
  
  // Slider State
  currentSlide = 0;
  slides = [
    { 
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070', 
      title: 'Welcome to E-Commerce', 
      subtitle: 'Discover the best products at unbeatable prices.' 
    },
    { 
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070', 
      title: 'New Season Arrivals', 
      subtitle: 'Shop the latest tech and trends.' 
    },
    { 
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070', 
      title: 'Exclusive Offers', 
      subtitle: 'Up to 50% off on selected categories.' 
    }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (products: any[]) => {
        this.trendingProducts = products.slice(0, 4);
      },
      error: (err) => console.error('Error fetching trending products:', err)
    });
  }

  // Slider Navigation Methods
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}