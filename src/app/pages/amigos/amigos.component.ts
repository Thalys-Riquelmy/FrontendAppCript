import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonCard, IonItem, IonInput, ToastController } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.scss'],
  imports: [
    IonInput, IonItem, IonCard, IonButton, IonCardContent, IonCardTitle, IonCardHeader,
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
  ]
})
export class AmigosComponent implements OnInit {
  showForm = false;
  codigoEmparelhamento: string = '';

  // Inclui chaveEmparelhamento para usar ao remover
  amigos: { login: string; email: string; chaveEmparelhamento: string }[] = [];

  constructor(private userService: UserService, private toastController: ToastController) {}

  ngOnInit() {
    this.carregarAmigos();
  }

  toggleForm(estado: boolean) {
    this.showForm = estado;
  }

  carregarAmigos() {
    this.userService.listarAmigos().subscribe({
      next: (res: any) => {
        this.amigos = res;
      },
      error: async () => {
        this.amigos = [];
        await this.presentToast('Erro ao carregar amigos');
      },
    });
  }

  adicionarAmigo() {
    if (!this.codigoEmparelhamento.trim()) {
      this.presentToast('Informe o código de emparelhamento');
      return;
    }

    this.userService.adicionarAmigo({ chaveEmparelhamento: this.codigoEmparelhamento.trim() }).subscribe({
      next: async (res: string) => {
        // 'res' será a mensagem string do backend
        const msg = res || 'Amigo adicionado com sucesso!';
        await this.presentToast(msg);
        this.codigoEmparelhamento = '';
        this.showForm = false;
        this.carregarAmigos(); // atualiza a lista sempre
      },
      error: async (err) => {
        const msg = err?.error || 'Erro ao adicionar amigo';
        await this.presentToast(msg);
      },
    });
  }


  removerAmigo(chaveEmparelhamento: string) {
  this.userService.removerAmigo({ chaveEmparelhamento }).subscribe({
    next: async (res: any) => {
      // Se o backend retorna a string diretamente, 'res' já será essa string
      const msg = typeof res === 'string' ? res : 'Amigo removido com sucesso.';
      await this.presentToast(msg);
      this.carregarAmigos();
    },
    error: async (err) => {
      const msg = err?.error || 'Erro ao remover amigo';
      await this.presentToast(msg);
      },
    });
  }


  enviarEmail(amigo: any) {
    this.presentToast(`Enviar email para: ${amigo.login} (não implementado)`);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom',
    });
    toast.present();
  }
}
