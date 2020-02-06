import { Injectable } from '@angular/core';
import { Subject, Observable, observable, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { StreamState } from '../models/stream-state';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Audio2Service {
  private token: string;
  private baseURL: string;
  private stop$ = new Subject();
  private audioObj = new Audio();
  private state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false,
  };
  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(this.state);

  audioEvents = [
    'ended', 
    'error', 
    'play', 
    'playing', 
    'pause', 
    'timeupdate', 
    'canplay', 
    'loadedmetadata', 
    'loadstart'
  ];
  
  constructor(private http: HttpClient) { 
    this.token = localStorage.getItem('token');
    this.baseURL = environment.apiURL;
  }

  play() {
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.stop$.next();
  }

  playStream(url) {
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }

  private streamObservable(url) {
    return new Observable(observer => {
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };

      this.addEvents(this.audioObj, this.audioEvents, handler);

      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        this.removeEvents(this.audioObj, this.audioEvents, handler);
        this.resetState();
      };
    });
  }

  private addEvents(obj, events, handler) {
    events.forEach(event => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj, events, handler) {
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }

  formatTime(time: number, format: string = 'HH:mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }

  seekTo(seconds) {
    this.audioObj.currentTime = seconds;
  }

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case 'canplay':
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        break;
      case 'playing':
        this.state.playing = true;
        break;
      case 'pause':
        this.state.playing = false;
        break;
      case 'timeupdate':
        this.state.currentTime = this.audioObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(this.state.currentTime);
        break;
      case 'error':
        this.resetState();
        this.state.error = true;
        break;
    }
    this.stateChange.next(this.state);
  }

  private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false
    };
  }

  get() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseURL + 'audios', {headers});
  }
}
