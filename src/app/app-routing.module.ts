import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
//  { path: 'home', component: HomeComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
    ],
  },
  { path: '', redirectTo: '/home/sign-in', pathMatch: 'full' }, // redirect to `first-component`
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
