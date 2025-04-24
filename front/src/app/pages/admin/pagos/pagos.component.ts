import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagosService,Pago } from '../../../services/pagos.service';
@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagos.component.html',
  styleUrl:'./pagos.component.scss'
})
export class PagosComponent implements OnInit {
  pagos: Pago[] = [];

  constructor(private pagosService: PagosService) {}

  ngOnInit(): void {
    this.pagosService.listar().subscribe((res) => {
      this.pagos = res;
    });
  }
}
