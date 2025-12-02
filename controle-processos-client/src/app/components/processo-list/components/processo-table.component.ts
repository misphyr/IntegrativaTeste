import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Processo, EProcessoStatus } from '../../../models/processo';
import { ProcessoStatusPipe } from '../../../pipes/processo-status.pipe';
import { ProcessoNumberMaskPipe } from '../../../pipes/processo-number-mask.pipe';

@Component({
  selector: 'app-processo-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ProcessoStatusPipe, ProcessoNumberMaskPipe],
  template: `
    <div *ngIf="processos && processos.length > 0" class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-200">
            <tr>
              <th class="px-6 py-4 text-center text-gray-800 font-semibold">Ações</th>
              <th class="px-6 py-4 text-left text-gray-800 font-semibold">Número</th>
              <th class="px-6 py-4 text-left text-gray-800 font-semibold">Autor</th>
              <th class="px-6 py-4 text-left text-gray-800 font-semibold">Réu</th>
              <th class="px-6 py-4 text-left text-gray-800 font-semibold">Status</th>
              <th class="px-6 py-4 text-left text-gray-800 font-semibold">Data Ajuizamento</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let processo of processos" class="border-t hover:bg-gray-50">
              <td class="px-6 py-4 text-center flex justify-center gap-2">
                <button (click)="view.emit(processo)"
                  class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded text-sm transition"
                  title="Ver detalhes">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </button>
                <button (click)="edit.emit(processo)"
                  class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
                <button (click)="delete.emit(processo.id)"
                  class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </td>
              <td class="px-6 py-4 text-gray-700">{{ processo.numeroProcesso | processoNumberMask }}</td>
              <td class="px-6 py-4 text-gray-700">{{ processo.autor }}</td>
              <td class="px-6 py-4 text-gray-700">{{ processo.reu }}</td>
              <td class="px-6 py-4">
                <select [(ngModel)]="processo.status" (change)="onStatusChange($event, processo)"
                  [ngClass]="getStatusClass(processo.status)"
                  class="min-w-max px-3 py-1 rounded font-semibold cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 appearance-none bg-no-repeat bg-right"
                  style="padding-right: 2rem; background-image: url('data:image/svg+xml;utf8,<svg fill=%23000 viewBox=%270 0 20 20%27 xmlns=%27http://www.w3.org/2000/svg%27><path d=%27M9.293 12.95a1 1 0 1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 1.414 1.414L5.414 9z%27/></svg>')">
                  <option *ngFor="let status of statusOptions" [ngValue]="status">
                    {{ status | processoStatus }}
                  </option>
                </select>
              </td>
              <td class="px-6 py-4 text-gray-700">{{ formatDate(processo.dataAjuizamento) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ProcessoTableComponent {
  @Input() processos: Processo[] = [];
  @Input() statusOptions: EProcessoStatus[] = [];
  @Output() view = new EventEmitter<Processo>();
  @Output() edit = new EventEmitter<Processo>();
  @Output() delete = new EventEmitter<number>();
  @Output() statusChange = new EventEmitter<Processo>();

  getStatusClass(status: EProcessoStatus): string {
    const statusClasses: Record<EProcessoStatus, string> = {
      [EProcessoStatus.EmAndamento]: 'bg-blue-100 text-blue-800',
      [EProcessoStatus.Encerrado]: 'bg-green-100 text-green-800',
      [EProcessoStatus.Suspenso]: 'bg-yellow-100 text-yellow-800'
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  }

  formatDate(date: any): string {
    if (!date) return '-';
    const d = new Date(date);
    const dateStr = d.toLocaleDateString('pt-BR');
    const timeStr = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return `${dateStr} ${timeStr}`;
  }

  onStatusChange(event: Event, processo: Processo): void {
    this.statusChange.emit(processo);
  }
}
