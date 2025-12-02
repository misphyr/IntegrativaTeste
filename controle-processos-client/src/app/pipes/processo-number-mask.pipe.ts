import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'processoNumberMask',
  standalone: true
})
export class ProcessoNumberMaskPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const digits = value.replace(/\D/g, '');
    
    if (!digits) return '';

    // NNNNNNN-DD.AAAA.J.TT.OOOO
    return digits
      .replace(/^(\d{7})(\d)/, '$1-$2')
      .replace(/^(\d{7}-\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{7}-\d{2}\.\d{4})(\d)/, '$1.$2')
      .replace(/^(\d{7}-\d{2}\.\d{4}\.\d{1})(\d)/, '$1.$2')
      .replace(/^(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2})(\d)/, '$1.$2')
      .substring(0, 29);
  }
}
