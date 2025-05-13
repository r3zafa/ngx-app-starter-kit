import { Component } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-content",
  standalone: true,
  templateUrl: "./content.component.html",
  styleUrl: "./content.component.scss",
  imports: [TranslatePipe],
})
export class ContentComponent {}
