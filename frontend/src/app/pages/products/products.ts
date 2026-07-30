import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];

  searchTerm: string = '';
  selectedCategory: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data: any[]) => {
        this.products = data;
        this.filteredProducts = data;
        this.categories = [...new Set(data.map(p => p.category))];
      },
      error: (err) => console.error(err)
    });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
      const matchesMinPrice = this.minPrice !== null ? product.price >= this.minPrice : true;
      const matchesMaxPrice = this.maxPrice !== null ? product.price <= this.maxPrice : true;

      return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.filteredProducts = this.products;
  }
}