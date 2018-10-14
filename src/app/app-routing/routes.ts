import { Routes } from '@angular/router' ;
import { RegisterationOneComponent } from './../registeration-one/registeration-one.component';
import { RegisterationTwoComponent } from './../registeration-two/registeration-two.component';

export const routes: Routes = [
    {path: 'wireframeA', component: RegisterationOneComponent},
    {path: 'wireframeB', component: RegisterationTwoComponent},
    {path: '', redirectTo: '/wireframeA', pathMatch: 'full'}
];
