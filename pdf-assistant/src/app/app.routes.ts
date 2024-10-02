import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { PreviewComponent } from './preview/preview.component';

export const routes: Routes = [
    {
        path: '',
        component: PreviewComponent,
    },
    {
        path: 'form',
        component: FormComponent
    }
];
