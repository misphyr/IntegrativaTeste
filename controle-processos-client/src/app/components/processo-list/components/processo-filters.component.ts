import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EProcessoStatus } from '../../../models/processo';
import { ProcessoStatusPipe } from '../../../pipes/processo-status.pipe';

@Component({
  selector: 'app-processo-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, ProcessoStatusPipe],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Buscar</label>
          <input [(ngModel)]="searchTermValue" type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Número de processo, Autor, Réu"
            (input)="searchTermChange.emit(searchTermValue)">
        </div>

        <div>
          <label class="block text-gray-700 font-semibold mb-2">Filtrar por Status</label>
          <select [(ngModel)]="filterStatusValue"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 appearance-none bg-no-repeat bg-right"
            style="padding-right: 2.5rem; background-image: url('data:image/svg+xml;utf8,<svg fill=%23666 viewBox=%270 0 20 20%27 xmlns=%27http://www.w3.org/2000/svg%27><path d=%27M9.293 12.95a1 1 0 1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 1.414 1.414L5.414 9z%27/></svg>')"
            (change)="filterStatusChange.emit(filterStatusValue)">
            <option [ngValue]="null">Todos os Status</option>
            <option *ngFor="let status of statusOptions" [ngValue]="status">
              {{ status | processoStatus }}
            </option>
          </select>
        </div>

        <div class="flex items-end">
          <button (click)="refresh.emit()"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition">
            Atualizar
          </button>
        </div>
      </div>
    </div>
  `
})
export class ProcessoFiltersComponent {
  @Input() searchTermValue = '';
  @Input() filterStatusValue: EProcessoStatus | null = null;
  @Input() statusOptions: EProcessoStatus[] = [];
  @Output() searchTermChange = new EventEmitter<string>();
  @Output() filterStatusChange = new EventEmitter<EProcessoStatus | null>();
  @Output() refresh = new EventEmitter<void>();
}
