// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmparelhamentoDTO } from '../models/user.dto';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = 'https://routepro-latest.onrender.com/usuarios'; // ajuste conforme o backend

  constructor(private http: HttpClient) {}

  adicionarAmigo(dto: EmparelhamentoDTO) {
    return this.http.post<string>(`${this.api}/adicionar-amigo`, dto, { responseType: 'text' as 'json' });
  }

  listarAmigos() {
    return this.http.get(`${this.api}/meus-amigos`);
  }

  informacaoUser() {
    return this.http.get(`${this.api}/info`);
  }

  removerAmigo(dto: { chaveEmparelhamento: string }) {
    return this.http.request<string>('DELETE', `${this.api}/remover-amigo`, { body: dto, responseType: 'text' as 'json' });
  }


}
