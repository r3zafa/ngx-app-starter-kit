import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [MatButtonModule,MatDividerModule,MatIconModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

}
