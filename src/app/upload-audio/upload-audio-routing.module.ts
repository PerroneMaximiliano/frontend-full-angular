import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUploadComponent } from './list-upload/list-upload.component';
import { CreateUploadComponent } from './create-upload/create-upload.component';
import { CanActivateGuard } from '../can-activate.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [CanActivateGuard],
    children: [
      {
        path: 'list',
        component: ListUploadComponent
      },
      {
        path: 'create',
        component: CreateUploadComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadAudioRoutingModule { }
