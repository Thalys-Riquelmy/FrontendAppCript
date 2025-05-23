import { Component } from '@angular/core';
import { IonContent, IonHeader,IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonCard } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.fileName = file ? file.name : null;
  }

}
