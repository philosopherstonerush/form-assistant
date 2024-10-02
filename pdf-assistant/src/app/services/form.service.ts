import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  pdfImages: string[] = [];
  pdfImagesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.pdfImages);
  questions: any = [];

  constructor(private http: HttpClient) { }

  setPdfImages(images: string[]) {
    this.pdfImages = images;
    this.pdfImagesSubject.next(this.pdfImages);
  }

  postImageData(data: any) {
    return this.http.post(environment.apiUrl + '/extract', data);
  }

  setQuestions(questions: any) {
    this.questions = questions;
  }

  getQuestions() {
    return this.questions;
  }

}
