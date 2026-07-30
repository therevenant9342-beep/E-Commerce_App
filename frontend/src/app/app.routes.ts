import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { RegisterComponent } from './pages/register/register';
import { LoginComponent } from './pages/login/login';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home}, 
  { path: 'products', component: Products },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' }
];