import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuard } from './guards/auth.guard';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [

  {
    path: '',
    component: NavbarComponent,
    canActivate: [AuthGuard]
  },
  { path: 'test', component: TestComponent, canActivate: [AuthGuard] },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
