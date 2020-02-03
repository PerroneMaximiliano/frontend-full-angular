import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-upload',
  templateUrl: './create-upload.component.html',
  styleUrls: ['./create-upload.component.css']
})
export class CreateUploadComponent implements OnInit {
  filesToUpload: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  uploadForm = this.formBuilder.group({
    number: ['', {
      validators: [Validators.required]
    }],
    title: ['', {
      validators: [Validators.required]
    }],
    duration: ['', {
      validators: [Validators.required]
    }],
    file: null
  });

  upload() {
    
    this.uploadForm.value.file = this.filesToUpload;

    console.log(this.uploadForm.value)
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload)
  }

}
