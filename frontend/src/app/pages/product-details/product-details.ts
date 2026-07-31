import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Added ChangeDetectorRef
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ProductService } from '../../services/product/product';
import { CartService } from '../../services/cart/cart';
import { AuthService } from '../../services/auth/auth';
import { Product } from '../../models/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink], 
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data: any) => {
          console.log('Single Product API Response:', data);
          
          if (data && data.product) {
            this.product = data.product;
          } else if (Array.isArray(data)) {
            this.product = data[0];
          } else {
            this.product = data;
          }
          
          this.cdr.detectChanges();
        }, 
        error: (err) => console.error(err)
      });
    }
  }

  addToCart() {
    if (this.product) {
      if (!this.authService.isLoggedIn()) {
        this.toastr.warning('Please log in first to add items to your cart.', 'Authentication Required');
        this.router.navigate(['/login']);
        return; 
      }
      
      this.cartService.addToCart(this.product);
      this.toastr.success('Item added to cart!', 'Success');
    }
  }
}