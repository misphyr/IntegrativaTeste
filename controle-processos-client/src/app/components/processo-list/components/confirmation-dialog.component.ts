import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ConfirmDialog {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="dialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div class="border-b border-gray-200 px-8 py-6">
          <h2 class="text-xl font-bold text-gray-800">{{ dialog.title }}</h2>
        </div>
        <div class="px-8 py-6">
          <p class="text-gray-600">{{ dialog.message }}</p>
        </div>
        <div class="border-t border-gray-200 px-8 py-6 flex gap-3 justify-end">
          <button (click)="dialog.onCancel()"
            class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded transition">
            Cancelar
          </button>
          <button (click)="dialog.onConfirm()"
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  `
})
export class ConfirmationDialogComponent {
  @Input() dialog: ConfirmDialog | null = null;
}
