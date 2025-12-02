import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { EProcessoStatus } from '../../../models/processo';
import { ProcessoStatusPipe } from '../../../pipes/processo-status.pipe';
import { ProcessoNumberMaskPipe } from '../../../pipes/processo-number-mask.pipe';

@Component({
  selector: 'app-processo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ProcessoStatusPipe, ProcessoNumberMaskPipe],
  template: `
    <div *ngIf="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div class="border-b border-gray-200 px-8 py-6">
          <h2 class="text-2xl font-bold text-gray-800">
            {{ editingId ? 'Editar Processo' : 'Novo Processo' }}
          </h2>
        </div>

        <div class="overflow-y-auto flex-1 px-8 py-6">
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Número do Processo*</label>
                <input formControlName="numeroProcesso" type="text" maxlength="24"
                  (input)="onNumeroProcessoInput($event)"
                  class="w-full px-4 py-2 border rounded focus:outline-none"
                  [ngClass]="form.get('numeroProcesso')?.invalid && form.get('numeroProcesso')?.touched ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'"
                  placeholder="Ex: 0001234-56.2023.8.26.0100">
                <span *ngIf="form.get('numeroProcesso')?.invalid && form.get('numeroProcesso')?.touched"
                  class="text-red-500 text-sm">{{ getFieldError('numeroProcesso') }}</span>
              </div>

              <div>
                <label class="block text-gray-700 font-semibold mb-2">Status*</label>
                <select formControlName="status" class="w-full px-4 py-2 border rounded focus:outline-none"
                  [ngClass]="form.get('status')?.invalid && form.get('status')?.touched ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'">
                  <option *ngFor="let status of statusOptions" [value]="status">
                    {{ status | processoStatus }}
                  </option>
                </select>
                <span *ngIf="form.get('status')?.invalid && form.get('status')?.touched"
                  class="text-red-500 text-sm">{{ getFieldError('status') }}</span>
              </div>
            </div>

            <div>
              <label class="block text-gray-700 font-semibold mb-2">Autor*</label>
              <input formControlName="autor" type="text" maxlength="150"
                class="w-full px-4 py-2 border rounded focus:outline-none"
                [ngClass]="form.get('autor')?.invalid && form.get('autor')?.touched ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'"
                placeholder="Nome do autor">
              <span *ngIf="form.get('autor')?.invalid && form.get('autor')?.touched"
                class="text-red-500 text-sm">{{ getFieldError('autor') }}</span>
            </div>

            <div>
              <label class="block text-gray-700 font-semibold mb-2">Réu*</label>
              <input formControlName="reu" type="text" maxlength="150"
                class="w-full px-4 py-2 border rounded focus:outline-none"
                [ngClass]="form.get('reu')?.invalid && form.get('reu')?.touched ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'"
                placeholder="Nome do réu">
              <span *ngIf="form.get('reu')?.invalid && form.get('reu')?.touched"
                class="text-red-500 text-sm">{{ getFieldError('reu') }}</span>
            </div>

            <div>
              <label class="block text-gray-700 font-semibold mb-2">Data de Ajuizamento</label>
              <input formControlName="dataAjuizamento" type="date"
                class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
            </div>

            <div>
              <label class="block text-gray-700 font-semibold mb-2">Descrição</label>
              <textarea formControlName="descricao" maxlength="500"
                class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none overflow-auto"
                placeholder="Descrição do processo" rows="4"></textarea>
              <span *ngIf="form.get('descricao')?.invalid && form.get('descricao')?.touched"
                class="text-red-500 text-sm">{{ getFieldError('descricao') }}</span>
            </div>
          </form>
        </div>

        <div class="border-t border-gray-200 px-8 py-6 flex gap-3 justify-end">
          <button type="button" (click)="onCancel()"
            class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded transition">
            Cancelar
          </button>
          <button type="submit" [disabled]="loading" (click)="onSubmit()"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition disabled:bg-gray-400">
            {{ loading ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </div>
    </div>
  `
})
export class ProcessoFormComponent {
  @Input() showForm = false;
  @Input() form!: FormGroup;
  @Input() statusOptions: EProcessoStatus[] = [];
  @Input() editingId: number | null = null;
  @Input() loading = false;
  @Output() submitted = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onSubmit(): void {
    this.submitted.emit();
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('maxlength')) {
      const maxLength = field.getError('maxlength').requiredLength;
      return `Máximo de ${maxLength} caracteres`;
    }
    return '';
  }

  onNumeroProcessoInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const maskPipe = new ProcessoNumberMaskPipe();
    const masked = maskPipe.transform(input.value);
    this.form.patchValue({ numeroProcesso: masked }, { emitEvent: false });
  }
}
