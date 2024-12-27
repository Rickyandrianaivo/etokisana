import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ClientAreaComponent } from './components/pages/client-area/client-area.component';
import { ClientProfileComponent } from './components/pages/client-profile/client-profile.component';
import { UserProductsComponent } from './components/pages/user-products/user-products.component';
import { AddProductComponent } from './components/pages/add-product/add-product.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { PasswordResetComponent } from './components/pages/password-reset/password-reset.component';
import { EmailVerificationComponent } from './components/pages/email-verification/email-verification.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { AchatComponent } from './components/pages/achat/achat.component';
import { PanierComponent } from './components/pages/panier/panier.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';
import { UpdateProductComponent } from './components/pages/update-product/update-product.component';

export const routes: Routes = [
    {path : '', component: LoginComponent},
    {path : 'home', component: HomeComponent},
    {path : 'achat', component: AchatComponent},
    {path : 'login', component: LoginComponent},
    {path : 'panier', component: PanierComponent},
    {path : 'contact', component: ContactComponent},
    {path : 'register', component: RegisterComponent},
    {path : 'client-area', component: ClientAreaComponent},
    {path : 'user-products', component: UserProductsComponent},
    {path : 'password-reset', component: PasswordResetComponent},
    {path : 'client-profile', component: ClientProfileComponent},
    {path : 'product-page/:id', component: ProductPageComponent},
    {path : 'user-products/add', component: AddProductComponent},
    {path : 'user-products/update/:id',component: UpdateProductComponent},
    {path : 'forgot-password', component: ForgotPasswordComponent},
    {path : 'email-verification', component: EmailVerificationComponent},
];
