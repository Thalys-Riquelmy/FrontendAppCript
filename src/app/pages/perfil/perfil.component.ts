import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader,IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonCard, IonItem, IonInput } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [IonInput, IonItem, IonCard, IonCardContent, IonCardTitle, IonCardHeader,
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton
  ]
})
export class PerfilComponent implements OnInit {
  usuario = {
    login: '',
    email: '',
    chaveEmparelhamento: ''
  };

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.carregarInformacoes();
  }

  carregarInformacoes() {
    this.userService.informacaoUser().subscribe({
      next: (res: any) => {
        this.usuario.login = res.login;
        this.usuario.email = res.email;
        this.usuario.chaveEmparelhamento = res.chaveEmparelhamento;
      },
      error: () => {
        console.error('Erro ao carregar informações do usuário');
      }
    });
  }

  alterarSenha() {
    // Placeholder para função alterar senha
    alert('Funcionalidade alterar senha não implementada ainda.');
  }
}
