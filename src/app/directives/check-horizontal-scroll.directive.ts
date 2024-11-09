import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCheckHorizontalScroll]',
  standalone: true
})
export class CheckHorizontalScrollDirective {

  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;
  private scrollElement!: HTMLElement;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    // Verifica si el contenedor principal tiene scroll horizontal
    if (this.el.nativeElement.scrollWidth > this.el.nativeElement.clientWidth) {
      this.scrollElement = this.el.nativeElement;
    } else {
      // Si el contenedor principal no tiene scroll, busca un hijo con scroll horizontal
      this.scrollElement = this.findScrollableChild() || this.el.nativeElement;
    }

    // Define el cursor inicial
    this.scrollElement.style.cursor = 'grab';
  }

  // Método para encontrar un hijo con scroll horizontal, si existe
  private findScrollableChild(): HTMLElement | null {
    const children = this.el.nativeElement.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].scrollWidth > children[i].clientWidth) {
        return children[i];
      }
    }
    return null;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (this.scrollElement.scrollWidth > this.scrollElement.clientWidth) {
      this.isDragging = true;
      this.startX = event.pageX - this.scrollElement.offsetLeft;
      this.scrollLeft = this.scrollElement.scrollLeft;
      this.scrollElement.style.cursor = 'grabbing';
      event.preventDefault();
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
      this.scrollElement.style.cursor = 'grab';
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    const x = event.pageX - this.scrollElement.offsetLeft;
    const walk = (x - this.startX) * 1; // Ajusta la sensibilidad si es necesario
    this.scrollElement.scrollLeft = this.scrollLeft - walk;
  }

}
