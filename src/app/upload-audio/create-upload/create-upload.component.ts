import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AudioService } from 'src/app/services/audio.service';
	
import { HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Audio } from 'src/app/models/audio.model';

@Component({
  selector: 'app-create-upload',
  templateUrl: './create-upload.component.html',
  styleUrls: ['./create-upload.component.css']
})
export class CreateUploadComponent implements OnInit {
  filesToUpload: any;
  fileUploadProgress: string = null;
  fileData: File = null;
  url: string = '';

  audio: Audio = null;

  constructor(private formBuilder: FormBuilder, private audioService: AudioService) { 
    this.url = environment.apiURL;
  }

  ngOnInit() {
  }

  uploadForm = this.formBuilder.group({
    number: ['', {
      validators: [Validators.required]
    }],
    name: ['', {
      validators: [Validators.required]
    }],
    duration: ['', {
      validators: [Validators.required]
    }],
    file: null
  });

  upload() {
    if (!this.uploadForm.valid) {
      alert('Formulario no valido');
      return;
    }
    
    this.uploadForm.value.file = this.fileData;

    this.fileUploadProgress = '0%';

    this.audioService.uploadFile(this.uploadForm.value).subscribe(events => {
      if(events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        console.log(this.fileUploadProgress);
      } else if(events.type === HttpEventType.Response) {
        this.fileUploadProgress = '';

        this.audio = events.body['audio'];

        console.log(events.body);          
        alert('SUCCESS !!');
      }
         
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    console.log('file selected', this.fileData)
  }

}
