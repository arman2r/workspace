import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { workExp } from '@/app/interfaces/work.interface';

@Component({
  selector: 'app-description-profile-nav',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatProgressBarModule],
  templateUrl: './description-profile-nav.component.html',
  styleUrl: './description-profile-nav.component.scss'
})
export class DescriptionProfileNavComponent {
  @Input() detailWork?: workExp | null;
  @Output('panelClosed') panelClosed = new EventEmitter<boolean>(false);
  showMore = false;
  skillProgress?: number[] = [];

  ngOnInit(): void {
    console.log('detalle work', this.detailWork)

    this.skillProgress = this.detailWork?.skills?.map(() => 0);


  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    this.skillProgress = this.detailWork?.skills?.map(() => 0);

    this.detailWork?.skills?.forEach((skill: any, index) => {
      const interval = setInterval(() => {
        if ((this.skillProgress as any)[index] < skill.skillLevel) {
          (this.skillProgress as any)[index]++
        } else {
          clearInterval(interval);
        }
      }, 20); // Ajusta el tiempo para controlar la velocidad del incremento
    });

  }

  getSkillProgress(index: number): number {
    return (this.skillProgress as any)[index];
  }

  toggleStatePanel() {
    this.panelClosed.emit(true);
  }


}
