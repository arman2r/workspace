import { Directive, ElementRef, Input, Renderer2, AfterViewInit } from '@angular/core';
import Vibrant from 'node-vibrant';

@Directive({
  selector: '[appDetectDominantColor]',
  standalone: true,
})
export class DetectDominantColorDirective implements AfterViewInit {
  @Input('appDetectDominantColor') targetElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const imgElement = this.el.nativeElement as HTMLImageElement;

    imgElement.crossOrigin = 'Anonymous'; // Evitar problemas de CORS

    imgElement.onload = () => {
      console.log('Imagen cargada:', imgElement.src);

      try {
        // Usar node-vibrant para obtener los colores de la imagen
        Vibrant.from(imgElement.src).getPalette()
          .then((palette) => {
            console.log('paleta de colores', palette);
            const dominantColor = palette.Muted; // Puedes elegir otros colores como Vibrant, DarkVibrant, etc.
            if (dominantColor) {
              console.log('Color dominante detectado:', dominantColor.hex);

              // Aplicar el color como fondo al elemento objetivo
              const target = this.targetElement || this.renderer.parentNode(this.el.nativeElement);
              if (!target) {
                console.warn('No se encontró el elemento objetivo para aplicar el color.');
                return;
              }

              this.renderer.setStyle(target, 'background-color', dominantColor.hex);
            }
          })
          .catch((error) => {
            console.error('Error al obtener el color dominante:', error);
          });
      } catch (error) {
        console.error('Error al detectar el color dominante:', error);
      }
    };
  }
}