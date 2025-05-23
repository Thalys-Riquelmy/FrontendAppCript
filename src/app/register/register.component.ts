import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegisterDTO } from '../models/auth.dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerData: RegisterDTO = {
    login: '',
    email: '',
    senha: '',
    role: 'ADMIN'
  };

  confirmarSenha: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async register() {
    if (this.registerData.senha !== this.confirmarSenha) {
      this.presentToast('As senhas não coincidem');
      return;
    }

    try {
      await this.authService.register(this.registerData).toPromise();
      this.presentToast('Cadastro realizado com sucesso!');
      this.router.navigate(['/login']);
    } catch (error) {
      this.presentToast('Erro ao cadastrar. Verifique os dados.');
      console.error(error);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'primary'
    });
    toast.present();
  }
}
