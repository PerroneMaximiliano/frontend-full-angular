import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { Audio } from 'src/app/models/audio.model';

@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {
  alertMessage: string = '';
  audios: Array<Audio> = null;

  constructor(private audioService: AudioService) { }

  ngOnInit() {
    this.getAudios();
  }

  getAudios() {
    this.audioService.getAudios().subscribe(
      response => {
        if(!response['audios']){
          this.alertMessage = 'no hay canciones';
        }else{
          this.audios = response['audios'];
        }
      },
      error => {
        var errorMessage = <any>error;

            if(errorMessage != null){
              var body = JSON.parse(error._body);
              //this.alertMessage = body.message;

              console.log(error);
            }
      });
  }

}
