import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portafolioApp';
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Verifica si estás en el navegador
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('dark-theme');
    }
  }
  
}
