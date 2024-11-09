import { Component, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; 
import { EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { workExp } from '@/app/interfaces/work.interface';
import { NgClass } from '@angular/common';
import { CheckHorizontalScrollDirective } from '@/app/directives/check-horizontal-scroll.directive';

@Component({
  selector: 'app-time-line-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgClass, CheckHorizontalScrollDirective],
  templateUrl: './time-line-card.component.html',
  styleUrl: './time-line-card.component.scss'
})
export class TimeLineCardComponent {
  @Input() dataWorks?: workExp[];
  @Input() tileActive?: number | null;
  @Input() drawerIntoGrid!: boolean | undefined;
  @Input() drawer!: boolean | undefined;

  @Output() drawerStatus = new EventEmitter<String>();
  activeCardIndex: number | null = null;

  toggleDrawer(dataWork: workExp, index: number) {
    this.drawerStatus.emit(JSON.stringify(dataWork))
    this.activeCardIndex = this.activeCardIndex === index ? null : index;
    
  }
}
