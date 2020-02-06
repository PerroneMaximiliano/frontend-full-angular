import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { Audio } from 'src/app/models/audio.model';
import { environment } from '../../../environments/environment';
import { StreamState } from '../../models/stream-state';

@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {
  alertMessage: string = '';
  url: string = '';
  audios: Array<Audio> = [];
  currentAudio: Audio = null;
  currentFile: any = {};
  state: StreamState;

  constructor(private audioService: AudioService) { 
    this.url = environment.apiURL;
  }

  ngOnInit() {
    this.getAudios();

    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
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

  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(this.url + 'get-audio-file/' + file.file);
  }
  
  playStream(url) {
    this.audioService.playStream(url)
    .subscribe(events => {
      // listening for fun here
    });
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }
  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.audios.length - 1;
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.audios[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.audios[index];
    this.openFile(file, index);
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }

}
