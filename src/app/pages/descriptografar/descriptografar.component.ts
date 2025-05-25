import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonCard } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-descriptografar',
  templateUrl: './descriptografar.component.html',
  styleUrls: ['./descriptografar.component.scss'],
  imports: [IonCard, IonButton, IonCardContent, IonCardTitle, IonCardHeader,
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
  ]
})
export class DescriptografarComponent {

  encryptedFileName: string | null = null;
  keyFileName: string | null = null;

  encryptedFile: File | null = null;
  keyFile: File | null = null;

  constructor(private cryptoService: CryptoService) {}

  onEncryptedFileSelected(event: any) {
    const file = event.target.files[0];
    this.encryptedFileName = file ? file.name : null;
    this.encryptedFile = file ? file : null;
  }

  onKeyFileSelected(event: any) {
    const file = event.target.files[0];
    this.keyFileName = file ? file.name : null;
    this.keyFile = file ? file : null;
  }

  decrypt() {
    if (!this.encryptedFile || !this.keyFile) {
      console.error("Arquivo criptografado e/ou chave não foram selecionados!");
      return;
    }

    this.cryptoService.decryptFile(this.encryptedFile, this.keyFile).subscribe({
      next: (blob: Blob) => {  // Tipo explicitado
        this.downloadFile(blob, this.encryptedFileName!.replace('.encrypted', ''));

        this.encryptedFile = null;
        this.keyFile = null;
        this.encryptedFileName = null;
        this.keyFileName = null;

        console.log('Arquivo descriptografado com sucesso!');
      },
      error: (err: any) => {  // Tipo explicitado
        console.error('Erro ao descriptografar:', err);
      }
    });
  }

  private downloadFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
