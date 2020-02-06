import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadAudioRoutingModule } from './upload-audio-routing.module';
import { ListUploadComponent } from './list-upload/list-upload.component';
import { CreateUploadComponent } from './create-upload/create-upload.component';
import { MaterialModule } from '../material/material.module';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListUploadComponent, CreateUploadComponent, ListComponent],
  imports: [
    CommonModule,
    UploadAudioRoutingModule,
    MaterialModule
  ]
})
export class UploadAudioModule { }
