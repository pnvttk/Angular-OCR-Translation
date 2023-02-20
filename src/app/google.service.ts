import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment_ex';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private http: HttpClient) { }

  vision(model: any) {
    console.log("call vision service")
    return this.http.post("https://vision.googleapis.com/v1/images:annotate?key=" + environment.apikey, model)
  }

  translate(model: any) {
    console.log("call translation service")
    return this.http.post("https://translation.googleapis.com/language/translate/v2?key=" + environment.apikey, model)
  }
}
