import { Component, OnInit } from '@angular/core';
import { Audio2Service } from 'src/app/services/audio2.service';
import { environment } from 'src/environments/environment';
import { StreamState } from 'src/app/models/stream-state';
import { Audio } from 'src/app/models/audio.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  apiURL: string;
  message: string;
  currentFileIndex: number = 0;
  state: StreamState;
  audios: Array<Audio> = [];
  
  constructor(private audioService: Audio2Service) { }

  ngOnInit() {
    this.apiURL = environment.apiURL;
    this.audioService.getState().subscribe(state => this.state = state);
    this.getAudios();
  }

  getAudios() {
    this.audioService.get().subscribe(resp => {
      if (!resp['audios']) {
        this.message = 'You have not audios.';
      }
      this.audios = resp['audios'];
    }, error => {
      const errorMessage = <any>error;
      if (errorMessage != null) {
        console.log(error._body.message);
      }
    });
  }

  openFile(file, index) {
    this.currentFileIndex = index;
    this.audioService.playStream(this.urlFile(file)).subscribe();
  }

  urlFile(name) {
    return `${this.apiURL}get-audio-file/${name}`;
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }

  isFirstPlaying() {
    return this.currentFileIndex === 0;
  }

  isLastPlaying() {
    return this.currentFileIndex === this.audios.length - 1;
  }

  previous() {
    const index = this.currentFileIndex - 1;
    this.openFile(this.audios[index].file, index);
  }

  next() {
    const index = this.currentFileIndex + 1;
    this.openFile(this.audios[index].file, index);
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

}
