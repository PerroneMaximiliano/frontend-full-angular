import { Injectable } from '@angular/core';
import { Audio } from '../models/audio.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  baseURL = environment.apiURL;

  HttpUploadOptions = {
    headers: new HttpHeaders({ Accept: 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  uploadFile(audio: Audio) {
    const formData = new FormData();
    formData.append('file', audio.file);
    formData.append('number', audio.number.toString());
    formData.append('name', audio.name);
    formData.append('duration', audio.duration);

    return this.http.post(this.baseURL + 'audio', formData, {
      reportProgress: true,
      observe: 'events'   
    });
  }
  
}
