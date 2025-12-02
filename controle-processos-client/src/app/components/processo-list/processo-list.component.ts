import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProcessoService } from '../../services/processo.service';
import { Processo, CreateProcessoRequest, UpdateProcessoRequest, EProcessoStatus, CreateHistoricoRequest, UpdateHistoricoRequest, Historico } from '../../models/processo';
import { ProcessoStatusPipe } from '../../pipes/processo-status.pipe';
import { 
  AlertMessageComponent, 
  ConfirmationDialogComponent, 
  ConfirmDialog,
  ProcessoFormComponent, 
  ProcessoTableComponent, 
  ProcessoPaginationComponent, 
  ProcessoFiltersComponent,
  HistoricoFormComponent, 
  HistoricoTableComponent, 
  HistoricoPaginationComponent 
} from './components/index';

@Component({
  selector: 'app-processo-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    AlertMessageComponent,
    ConfirmationDialogComponent,
    ProcessoFormComponent,
    ProcessoTableComponent,
    ProcessoPaginationComponent,
    ProcessoFiltersComponent,
    HistoricoFormComponent,
    HistoricoTableComponent,
    HistoricoPaginationComponent,
    ProcessoStatusPipe
  ],
  templateUrl: './processo-list.component.html',
  styleUrls: ['./processo-list.component.css']
})
export class ProcessoListComponent implements OnInit {
  processos: Processo[] = [];
  processoForm: FormGroup;
  historicoForm: FormGroup;
  showForm = false;
  showDetails = false;
  showHistoricoForm = false;
  selectedProcesso: Processo | null = null;
  editingId: number | null = null;
  editingHistoricoId: number | null = null;
  loading = false;
  statusOptions = Object.values(EProcessoStatus).filter(v => typeof v === 'number') as EProcessoStatus[];
  searchTerm = '';
  filterStatus: EProcessoStatus | null = null;
  messageAlert: { type: 'success' | 'error'; text: string } | null = null;
  confirmDialog: ConfirmDialog | null = null;
  
  processoPaginaAtual = 1;
  processoItensPorPagina = 10;
  
  historicoPaginaAtual = 1;
  historicoItensPorPagina = 10;

  constructor(
    private processoService: ProcessoService,
    private fb: FormBuilder
  ) {
    this.processoForm = this.fb.group({
      numeroProcesso: ['', [Validators.required, Validators.maxLength(24)]],
      autor: ['', [Validators.required, Validators.maxLength(150)]],
      reu: ['', [Validators.required, Validators.maxLength(150)]],
      status: [EProcessoStatus.EmAndamento, [Validators.required]],
      descricao: ['', [Validators.maxLength(500)]],
      dataAjuizamento: ['']
    });

    this.historicoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.loadProcessos();
  }

  loadProcessos(): void {
    this.loading = true;
    this.resetProcessoPaginacao();
    this.processoService.getProcessos().subscribe({
      next: (data) => {
        this.processos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar processos:', err);
        this.showMessage('Erro ao carregar processos', 'error');
        this.loading = false;
      }
    });
  }

  openForm(processo?: Processo): void {
    this.showForm = true;
    if (processo) {
      this.editingId = processo.id;
      this.processoForm.patchValue({
        numeroProcesso: processo.numeroProcesso,
        autor: processo.autor,
        reu: processo.reu,
        status: processo.status,
        descricao: processo.descricao,
        dataAjuizamento: processo.dataAjuizamento ? this.formatDateForInput(processo.dataAjuizamento) : ''
      });
    } else {
      this.editingId = null;
      this.processoForm.reset({ status: EProcessoStatus.EmAndamento });
    }
  }

  closeForm(): void {
    this.showForm = false;
    this.editingId = null;
    this.processoForm.reset();
  }

  openDetails(processo: Processo): void {
    this.selectedProcesso = processo;
    this.showDetails = true;
  }

  closeDetails(): void {
    this.showDetails = false;
    this.selectedProcesso = null;
  }

  submitForm(): void {
    if (!this.processoForm.valid) {
      Object.keys(this.processoForm.controls).forEach(key => {
        this.processoForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    const formValue = this.processoForm.value;
    const status = typeof formValue.status === 'number' ? formValue.status : parseInt(formValue.status, 10);
    // Extrai apenas os dígitos do número do processo
    const numeroProcessoDigitosApenas = formValue.numeroProcesso.replace(/\D/g, '');

    if (this.editingId) {
      const updateRequest: UpdateProcessoRequest = {
        numeroProcesso: numeroProcessoDigitosApenas,
        autor: formValue.autor,
        reu: formValue.reu,
        status: status,
        descricao: formValue.descricao,
        dataAjuizamento: formValue.dataAjuizamento ? new Date(formValue.dataAjuizamento) : undefined
      };

      this.processoService.updateProcesso(this.editingId, updateRequest).subscribe({
        next: () => {
          this.showMessage('Processo atualizado com sucesso', 'success');
          this.closeForm();
          this.loadProcessos();
        },
        error: (err) => {
          console.error('Erro ao atualizar processo:', err);
          this.showMessage('Erro ao atualizar processo', 'error');
          this.loading = false;
        }
      });
    } else {
      const createRequest: CreateProcessoRequest = {
        numeroProcesso: numeroProcessoDigitosApenas,
        autor: formValue.autor,
        reu: formValue.reu,
        status: status,
        descricao: formValue.descricao,
        dataAjuizamento: formValue.dataAjuizamento ? new Date(formValue.dataAjuizamento) : undefined
      };

      this.processoService.createProcesso(createRequest).subscribe({
        next: () => {
          this.showMessage('Processo criado com sucesso', 'success');
          this.closeForm();
          this.loadProcessos();
        },
        error: (err) => {
          console.error('Erro ao criar processo:', err);
          this.showMessage('Erro ao criar processo', 'error');
          this.loading = false;
        }
      });
    }
  }

  deleteProcesso(id: number): void {
    this.confirmDialog = {
      title: 'Deletar Processo',
      message: 'Tem certeza que deseja deletar este processo?',
      onConfirm: () => {
        this.confirmDialog = null;
        this.loading = true;
        this.processoService.deleteProcesso(id).subscribe({
          next: () => {
            this.showMessage('Processo deletado com sucesso', 'success');
            this.loadProcessos();
          },
          error: (err) => {
            console.error('Erro ao deletar processo:', err);
            this.showMessage('Erro ao deletar processo', 'error');
            this.loading = false;
          }
        });
      },
      onCancel: () => {
        this.confirmDialog = null;
      }
    };
  }

  updateStatus(processo: Processo): void {
    const newStatus = processo.status;
    
    const previousStatus = processo.status;

    this.loading = true;
    const updateRequest: UpdateProcessoRequest = {
      status: newStatus
    };

    this.processoService.updateProcesso(processo.id, updateRequest).subscribe({
      next: () => {
        this.showMessage('Status atualizado com sucesso', 'success');
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao atualizar status:', err);
        this.showMessage('Erro ao atualizar status', 'error');
        processo.status = previousStatus;
        this.loading = false;
      }
    });
  }

  get filteredProcessos(): Processo[] {
    return this.processos.filter(p => {
      const matchSearch = !this.searchTerm || 
        p.numeroProcesso.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.autor.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.reu.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchStatus = this.filterStatus === null || this.filterStatus === undefined || p.status === this.filterStatus;
      
      return matchSearch && matchStatus;
    });
  }

  get processosTotal(): number {
    return this.filteredProcessos.length;
  }

  get processoPaginasTotais(): number {
    return Math.ceil(this.processosTotal / this.processoItensPorPagina);
  }

  get processosPaginados(): Processo[] {
    const inicio = (this.processoPaginaAtual - 1) * this.processoItensPorPagina;
    const fim = inicio + this.processoItensPorPagina;
    return this.filteredProcessos.slice(inicio, fim);
  }

  get historicosPaginados(): any[] {
    if (!this.selectedProcesso?.historicos) return [];
    const inicio = (this.historicoPaginaAtual - 1) * this.historicoItensPorPagina;
    const fim = inicio + this.historicoItensPorPagina;
    return this.selectedProcesso.historicos.slice(inicio, fim);
  }

  get historicosPaginasTotais(): number {
    if (!this.selectedProcesso?.historicos) return 0;
    return Math.ceil(this.selectedProcesso.historicos.length / this.historicoItensPorPagina);
  }

  goToProcessoPage(page: number): void {
    if (page >= 1 && page <= this.processoPaginasTotais) {
      this.processoPaginaAtual = page;
    }
  }

  goToHistoricoPage(page: number): void {
    if (page >= 1 && page <= this.historicosPaginasTotais) {
      this.historicoPaginaAtual = page;
    }
  }

  resetProcessoPaginacao(): void {
    this.processoPaginaAtual = 1;
  }

  resetHistoricoPaginacao(): void {
    this.historicoPaginaAtual = 1;
  }

  getPaginasProcesso(): number[] {
    const totalPaginas = this.processoPaginasTotais;
    return Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  getPaginasHistorico(): number[] {
    const totalPaginas = this.historicosPaginasTotais;
    return Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  formatDateForInput(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  formatDate(date: any): string {
    if (!date) return '-';
    const d = new Date(date);
    const dateStr = d.toLocaleDateString('pt-BR');
    const timeStr = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return `${dateStr} ${timeStr}`;
  }

  getStatusClass(status: EProcessoStatus): string {
    const statusClasses: Record<EProcessoStatus, string> = {
      [EProcessoStatus.EmAndamento]: 'bg-blue-100 text-blue-800',
      [EProcessoStatus.Encerrado]: 'bg-green-100 text-green-800',
      [EProcessoStatus.Suspenso]: 'bg-yellow-100 text-yellow-800'
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  }

  openHistoricoForm(historico?: Historico): void {
    this.showHistoricoForm = true;
    if (historico) {
      this.editingHistoricoId = historico.id;
      this.historicoForm.patchValue({
        descricao: historico.descricao
      });
    } else {
      this.editingHistoricoId = null;
      this.historicoForm.reset();
    }
  }

  closeHistoricoForm(): void {
    this.showHistoricoForm = false;
    this.editingHistoricoId = null;
    this.historicoForm.reset();
  }

  submitHistoricoForm(): void {
    if (!this.historicoForm.valid || !this.selectedProcesso) {
      this.historicoForm.get('descricao')?.markAsTouched();
      return;
    }

    this.loading = true;
    const formValue = this.historicoForm.value;

    if (this.editingHistoricoId) {
      const updateRequest: UpdateHistoricoRequest = {
        descricao: formValue.descricao
      };

      this.processoService.updateHistorico(this.editingHistoricoId, updateRequest).subscribe({
        next: () => {
          this.showMessage('Histórico atualizado com sucesso', 'success');
          this.closeHistoricoForm();
          this.loadProcessoDetails();
        },
        error: (err) => {
          console.error('Erro ao atualizar histórico:', err);
          this.showMessage('Erro ao atualizar histórico', 'error');
          this.loading = false;
        }
      });
    } else {
      const createRequest: CreateHistoricoRequest = {
        processoId: this.selectedProcesso.id,
        descricao: formValue.descricao
      };

      this.processoService.createHistorico(createRequest).subscribe({
        next: () => {
          this.showMessage('Histórico criado com sucesso', 'success');
          this.closeHistoricoForm();
          this.loadProcessoDetails();
        },
        error: (err) => {
          console.error('Erro ao criar histórico:', err);
          this.showMessage('Erro ao criar histórico', 'error');
          this.loading = false;
        }
      });
    }
  }

  deleteHistorico(id: number): void {
    this.confirmDialog = {
      title: 'Deletar Histórico',
      message: 'Tem certeza que deseja deletar este histórico?',
      onConfirm: () => {
        this.confirmDialog = null;
        this.loading = true;
        this.processoService.deleteHistorico(id).subscribe({
          next: () => {
            this.showMessage('Histórico deletado com sucesso', 'success');
            this.loadProcessoDetails();
          },
          error: (err) => {
            console.error('Erro ao deletar histórico:', err);
            this.showMessage('Erro ao deletar histórico', 'error');
            this.loading = false;
          }
        });
      },
      onCancel: () => {
        this.confirmDialog = null;
      }
    };
  }

  loadProcessoDetails(): void {
    if (!this.selectedProcesso) return;
    
    this.loading = true;
    this.resetHistoricoPaginacao();
    this.processoService.getProcessoById(this.selectedProcesso.id).subscribe({
      next: (data) => {
        this.selectedProcesso = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes do processo:', err);
        this.showMessage('Erro ao carregar detalhes do processo', 'error');
        this.loading = false;
      }
    });
  }

  showMessage(text: string, type: 'success' | 'error'): void {
    this.messageAlert = { text, type };
    setTimeout(() => {
      this.messageAlert = null;
    }, 5000);
  }

  getFieldError(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
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
