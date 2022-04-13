import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleService } from './google.service';

import languages from 'src/assets/languages.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private googleService: GoogleService) {
  }
  // preview
  img = "./assets/upload.jpg"

  // vision
  base64: string = ""
  inputText: string = ""

  // translate
  targetLanguage: string = ""
  translatedText: string = ""

  lnList:{code:string,name:string,native:string}[] = languages

  onSelectFile(e:any){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (event:any) => {
        this.img = event.target.result;
        this.base64 = reader.result!.toString().split(',')[1] as string
        // console.log(this.base64)

        let model = {
          "requests": [
            {
              "image": {
                "content": this.base64
              },
              "features": [
                {
                  "type": "TEXT_DETECTION"
                }
              ]
            }
          ]
        }
        //* get response from service
        this.googleService.vision(model).subscribe((response:any)=>{
          // console.log(response)
          this.inputText = response.responses[0].fullTextAnnotation.text
          // console.log(this.inputText)
        })

      }
    }
  }

  translate(){
    console.log(this.targetLanguage)
    let model = {
      "q": [this.inputText],
      // "source": "en",
      "target": this.targetLanguage,
      "format": "text"
    }
    this.googleService.translate(model).subscribe((response:any)=>{
      this.translatedText = response.data.translations[0].translatedText
      console.log(this.translatedText)

    })
  }
}

