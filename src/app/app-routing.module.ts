import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './default/menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'menu', component: MenuComponent, children:
      [
        { path: 'home', component: HomeComponent },
        { path: 'about', component: AboutComponent },
      ]

  },


];
@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule { }
