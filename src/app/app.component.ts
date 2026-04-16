import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import{ MatToolbarModule, MatToolbar } from  '@angular/material/toolbar';
import {MatIconModule } from'@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatToolbar,
    MatIconModule,

],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'crud-angular-material';
}
