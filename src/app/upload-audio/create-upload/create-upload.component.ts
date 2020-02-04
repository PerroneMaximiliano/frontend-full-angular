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

    this.audioService.uploadFile(this.uploadForm.value).subscribe(
      response => {
        if (response.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(response.loaded / response.total * 100) + '%';
        } else if (response.type === HttpEventType.Response) {
          this.fileUploadProgress = '';
          this.audio = response.body['audio'];
          alert('Audio se subio correctamente')
        }
      },
      error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          var body = JSON.parse(error._body);
          //this.alertMessage = body.message;
          console.log(error);
        }
      }
    )
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }

}
