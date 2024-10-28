import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-description-profile-nav',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './description-profile-nav.component.html',
  styleUrl: './description-profile-nav.component.scss'
})
export class DescriptionProfileNavComponent {
  @Output('panelClosed') panelClosed = new EventEmitter<boolean>(false);

  toggleStatePanel() {
    this.panelClosed.emit(true);
  }


}
