import { Pipe, PipeTransform } from '@angular/core';
import { EProcessoStatus } from '../models/e-processo-status';

@Pipe({
  name: 'processoStatus',
  standalone: true
})
export class ProcessoStatusPipe implements PipeTransform {
  transform(value: EProcessoStatus): string {
    const labels = {
      [EProcessoStatus.EmAndamento]: 'Em Andamento',
      [EProcessoStatus.Suspenso]: 'Suspenso',
      [EProcessoStatus.Encerrado]: 'Encerrado',
    };
    return labels[value] || 'Desconhecido';
  }
}
