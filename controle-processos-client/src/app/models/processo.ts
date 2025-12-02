import { EProcessoStatus } from './e-processo-status';

export interface Historico {
  id: number;
  processoId: number;
  descricao?: string;
  dataInclusao: Date;
  dataAlteracao: Date;
}

export interface Processo {
  id: number;
  numeroProcesso: string;
  autor: string;
  reu: string;
  status: EProcessoStatus;
  descricao?: string;
  dataAjuizamento?: Date;
  dataInclusao: Date;
  historicos?: Historico[];
}

export { EProcessoStatus } from './e-processo-status';

export interface CreateProcessoRequest {
  numeroProcesso: string;
  autor: string;
  reu: string;
  status: EProcessoStatus;
  descricao?: string;
  dataAjuizamento?: Date;
}

export interface UpdateProcessoRequest {
  numeroProcesso?: string;
  autor?: string;
  reu?: string;
  status?: EProcessoStatus;
  descricao?: string;
  dataAjuizamento?: Date;
}

export interface CreateHistoricoRequest {
  processoId: number;
  descricao: string;
}

export interface UpdateHistoricoRequest {
  descricao: string;
}
