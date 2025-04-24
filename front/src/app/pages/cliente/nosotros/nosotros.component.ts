import { Component } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.scss'
})
export class NosotrosComponent {
  irASeccion() {
    const elemento = document.getElementById('quienes-somos');
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
}
