import { Component, OnInit, inject } from '@angular/core';
import { ProductService, Product } from '../../services/product/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  private productService = inject(ProductService);
  
  productsList: Product[] = []; 

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.productsList = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }
}