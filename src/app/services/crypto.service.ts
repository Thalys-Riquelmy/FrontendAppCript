import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private baseUrl = 'http://localhost:5000'; // URL do backend Flask

  constructor(private http: HttpClient) {}

  // Encriptar arquivo sem token, só envia o FormData
  encryptFile(file: File, algorithm?: string): Observable<Blob> {
    const formData = new FormData();
    formData.append('file', file);
    if (algorithm) {
      formData.append('algorithm', algorithm);
    }
    return this.http.post(`${this.baseUrl}/encrypt`, formData, {
      responseType: 'blob' // recebe arquivo zipado
    });
  }

  // Descriptografar arquivo sem token
  decryptFile(encryptedFile: File, keyFile: File): Observable<Blob> {
    const formData = new FormData();
    formData.append('encrypted_file', encryptedFile);
    formData.append('key_file', keyFile);

    return this.http.post(`${this.baseUrl}/decrypt`, formData, {
      responseType: 'blob'
    });
  }
}
