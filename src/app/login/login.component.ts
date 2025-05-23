import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../models/auth.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginData: LoginDTO = {
    login: '',
    senha: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async login() {
    try {
      await this.authService.login(this.loginData).toPromise();
      this.router.navigate(['/tabs']);
    } catch (err) {
      const toast = await this.toastController.create({
        message: 'Falha no login. Verifique suas credenciais.',
        duration: 3000,
        color: 'danger'
      });
      await toast.present();
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
