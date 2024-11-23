import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ClientAreaComponent } from './components/pages/client-area/client-area.component';

export const routes: Routes = [
    {path : '', component: RegisterComponent},
    {path : 'login', component: LoginComponent},
    {path : 'register', component: RegisterComponent},
    {path : 'client-area', component: ClientAreaComponent},
];
