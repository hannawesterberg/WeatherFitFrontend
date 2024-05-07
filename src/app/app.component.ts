import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OutfitComponent } from './features/outfit/outfit/outfit.component';
@Component({
 selector: 'app-root',
 standalone: true,
 imports: [
    RouterOutlet,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OutfitComponent
],
 templateUrl: './app.component.html',
 styleUrl: './app.component.css'
})
export class AppComponent {
 title = 'testproject';
}
