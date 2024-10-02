import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormService } from '../services/form.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

declare function downloadPdf(questions: any): void;

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  pdfImages: string[] = [];
  pdfImagesSubscription!: Subscription;
  questions: any = [];
  @ViewChild('content') content!: ElementRef;

  constructor(private formService: FormService, private router: Router) { }

  ngOnInit(): void {
    this.pdfImagesSubscription = this.formService.pdfImagesSubject.subscribe((images: string[]) => {
      this.pdfImages = images;
    });
    this.questions = this.formService.getQuestions();
    for(let i = 0; i < this.questions.length; i++) {
      this.questions[i].answer = '';
    }
    if (this.questions.length == 0) {
      this.router.navigate(['/']);
    } 
  }

  ngOnDestroy(): void {
    this.pdfImagesSubscription.unsubscribe();
  }

  onDownloadResponse() {
    downloadPdf(this.questions);
  }

  onChange(i: number, event: any) {
    console.log(event.target.value);
    this.questions[i].answer = event.target.value;
  }

  dashify(str: string) {
    str = str.toLowerCase();
    return str.replace(/\s+/g, "-");
  }

}
