import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProductsComponent } from './pages/products/products';
import { RegisterComponent } from './pages/register/register';
import { LoginComponent } from './pages/login/login';
import { CartComponent } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { ProductDetailsComponent } from './pages/product-details/product-details';
import { authGuard } from './guards/auth-guard';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailsComponent }, 
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'checkout', component: Checkout, canActivate: [authGuard] },
  
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  
  { path: '**', redirectTo: '' }
];