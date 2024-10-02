import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


declare function extractBase64Images(file: any): any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pdf-assistant';

  pdfImages: string[] = [];

  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log(file);
    extractBase64Images(file).then((images: any) => {
      console.log(images)
    })
  }
}
