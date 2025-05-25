import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonCard } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-criptografar',
  templateUrl: './criptografar.component.html',
  styleUrls: ['./criptografar.component.scss'],
  imports: [IonCard, IonButton, IonCardContent, IonCardTitle, IonCardHeader,
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
  ]
})
export class CriptografarComponent {

  fileName: string | null = null;
  selectedFile: File | null = null;

  constructor(private cryptoService: CryptoService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.fileName = file ? file.name : null;
    this.selectedFile = file ? file : null;
  }

  encrypt() {
    if (!this.selectedFile) {
      console.error("Nenhum arquivo selecionado!");
      return;
    }

    const algorithm = 'AES';

    this.cryptoService.encryptFile(this.selectedFile, algorithm).subscribe({
      next: (blob: Blob) => {  // Aqui o tipo explicitado
        this.downloadFile(blob, `${this.selectedFile!.name}.zip`);
        console.log('Arquivo criptografado com sucesso!');
      },
      error: (err: any) => {  // Aqui o tipo explicitado
        console.error('Erro ao criptografar:', err);
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
