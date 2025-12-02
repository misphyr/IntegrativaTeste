import { Component } from '@angular/core';
import { ProcessoListComponent } from './components/processo-list/processo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProcessoListComponent],
  template: `<app-processo-list></app-processo-list>`,
  styles: []
})
export class AppComponent {
  title = 'Controle de Processos';
}
