import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historico-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-50 border-t border-gray-300 px-4 py-3 flex items-center justify-between">
      <div class="text-sm text-gray-600">
        Mostrando {{ (paginaAtual - 1) * itensPorPagina + 1 }} a {{ Math.min(paginaAtual * itensPorPagina, total) }} de {{ total }} históricos
      </div>
      <div class="flex gap-2">
        <button (click)="onPageChange(paginaAtual - 1)" 
          [disabled]="paginaAtual === 1"
          class="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
          ← Anterior
        </button>
        <div class="flex gap-1">
          <button *ngFor="let p of getPages()"
            (click)="onPageChange(p)"
            [ngClass]="paginaAtual === p ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'"
            class="px-2 py-1 rounded text-sm">
            {{ p }}
          </button>
        </div>
        <button (click)="onPageChange(paginaAtual + 1)" 
          [disabled]="paginaAtual === paginasTotais"
          class="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
          Próximo →
        </button>
      </div>
    </div>
  `
})
export class HistoricoPaginationComponent {
  @Input() paginaAtual = 1;
  @Input() paginasTotais = 1;
  @Input() total = 0;
  @Input() itensPorPagina = 10;
  @Output() pageChange = new EventEmitter<number>();

  Math = Math;

  getPages(): number[] {
    return Array.from({ length: this.paginasTotais }, (_, i) => i + 1);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.paginasTotais) {
      this.pageChange.emit(page);
    }
  }
}
