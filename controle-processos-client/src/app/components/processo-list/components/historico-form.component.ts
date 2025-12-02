import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-historico-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div *ngIf="showForm" class="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
      <h4 class="text-lg font-bold text-gray-800 mb-4">
        {{ editingHistoricoId ? 'Editar Histórico' : 'Novo Histórico' }}
      </h4>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Descrição*</label>
          <textarea formControlName="descricao" maxlength="500"
            class="w-full px-4 py-2 border rounded focus:outline-none resize-none overflow-auto"
            [ngClass]="form.get('descricao')?.invalid && form.get('descricao')?.touched ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'"
            placeholder="Descrição do histórico" rows="4"></textarea>
          <span *ngIf="form.get('descricao')?.invalid && form.get('descricao')?.touched"
            class="text-red-500 text-sm">{{ getFieldError('descricao') }}</span>
        </div>

        <div class="flex gap-3 justify-end">
          <button type="button" (click)="onCancel()"
            class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded transition">
            Cancelar
          </button>
          <button type="submit" [disabled]="loading"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition disabled:bg-gray-400">
            {{ loading ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class HistoricoFormComponent {
  @Input() showForm = false;
  @Input() form!: FormGroup;
  @Input() editingHistoricoId: number | null = null;
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
}
