import { Component } from '@angular/core';
import { FormService } from '../services/form.service';
import { CommonModule} from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';


declare function extractBase64Images(file: any): Promise<any[]>;

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
  pdfImages: string[] = [];
  loading: boolean = false;

  constructor(private formService: FormService, private toastr: ToastrService, private router: Router) { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    extractBase64Images(file).then((images: string[]) => {
      this.pdfImages = images;
      this.formService.setPdfImages(this.pdfImages);
    })
  }

  onExtract() {
    this.loading = true;
    this.formService.postImageData({ images: this.pdfImages }).subscribe({
      next: (response: any) => {
        console.log(response);
        let questions = []
        for (let i = 0; i < response.length; i++) {
          questions.push(JSON.parse(response[i]));
        }
        this.formService.setQuestions(questions);
        this.router.navigate(['/form']);
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error('Error extracting data from images');
        this.loading = false;
      }
    });
  }

}
