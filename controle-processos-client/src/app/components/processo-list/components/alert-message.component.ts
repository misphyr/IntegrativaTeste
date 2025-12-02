import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="alert"
      [ngClass]="alert.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'"
      class="border px-4 py-3 rounded relative mb-6">
      {{ alert.text }}
    </div>
  `
})
export class AlertMessageComponent {
  @Input() alert: { type: 'success' | 'error'; text: string } | null = null;
}
