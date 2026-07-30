import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { ProductService } from '../../services/product/product';
import { CartService } from '../../services/cart/cart';

@Component({
  selector: 'app-product-details',
    standalone: true,
  imports: [RouterLink, JsonPipe],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data: any) => {
          this.product = data.product; 
        }, 
        error: (err) => console.error(err)
      });
    }
  }
    addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }
}