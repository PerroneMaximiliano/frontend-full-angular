import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CanActivateGuard } from './can-activate.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [CanActivateGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'upload',
    loadChildren: () => import('./upload-audio/upload-audio.module').then(mod => mod.UploadAudioModule),
    canLoad: [CanActivateGuard]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "**", redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
