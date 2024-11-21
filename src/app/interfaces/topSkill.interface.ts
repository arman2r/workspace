// top-skill.interface.ts

import { SafeHtml } from '@angular/platform-browser';

// Interfaz original para los datos
export interface TopSkill {
  id?: number;
  title?: string;
  companies?: string;
  description?: string; // Se mantiene como string
  image?: string;
}

// Interfaz para los datos sanitizados
export interface SanitizedTopSkill {
  id?: number;
  title?: string;
  companies?: string;
  description: SafeHtml; // Cambia Description a SafeHtml después de la sanitización
  image?: string;
}
