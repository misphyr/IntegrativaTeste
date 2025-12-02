import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Processo, CreateProcessoRequest, UpdateProcessoRequest, CreateHistoricoRequest, UpdateHistoricoRequest, Historico } from '../models/processo';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {
  private apiUrl = '/api/processos';
  private historicosUrl = '/api/historicos';

  constructor(private http: HttpClient) { }

  getProcessos(): Observable<Processo[]> {
    return this.http.get<Processo[]>(this.apiUrl);
  }

  getProcessoById(id: number): Observable<Processo> {
    return this.http.get<Processo>(`${this.apiUrl}/${id}`);
  }

  createProcesso(request: CreateProcessoRequest): Observable<Processo> {
    return this.http.post<Processo>(this.apiUrl, request);
  }

  updateProcesso(id: number, request: UpdateProcessoRequest): Observable<Processo> {
    return this.http.put<Processo>(`${this.apiUrl}/${id}`, request);
  }

  deleteProcesso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createHistorico(request: CreateHistoricoRequest): Observable<Historico> {
    return this.http.post<Historico>(this.historicosUrl, request);
  }

  updateHistorico(id: number, request: UpdateHistoricoRequest): Observable<Historico> {
    return this.http.put<Historico>(`${this.historicosUrl}/${id}`, request);
  }

  deleteHistorico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.historicosUrl}/${id}`);
  }
}
