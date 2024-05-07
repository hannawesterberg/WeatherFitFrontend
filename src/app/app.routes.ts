import { Routes } from '@angular/router';
import { CreateuserComponent } from './features/createuser/createuser/createuser.component';
import { OutfitComponent } from './features/outfit/outfit/outfit.component';
import { profileComponent } from './features/profileee/profile/profile.component';
import { InputComponent } from './features/input/input/input.component';


export const routes: Routes = [
   {
       path: '',
       redirectTo: 'create-user',
       pathMatch: 'full' //landingpage
   },
   {
        path: 'create-user',
        component: CreateuserComponent
   },
   {
        path: 'profile',
        component: profileComponent
   },
   {
        path: 'input',
        component: InputComponent
   },
   {
        path: 'outfit',
        component: OutfitComponent
   }


];
