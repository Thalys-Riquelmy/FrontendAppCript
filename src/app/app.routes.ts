import { Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'criptografar',
        loadComponent: () => import('./pages/criptografar/criptografar.component').then(m => m.CriptografarComponent)
      },
      {
        path: 'descriptografar',
        loadComponent: () => import('./pages/descriptografar/descriptografar.component').then(m => m.DescriptografarComponent)
      },
      {
        path: 'amigos',
        loadComponent: () => import('./pages/amigos/amigos.component').then(m => m.AmigosComponent)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent)
      },
      {
        path: '',
        redirectTo: 'criptografar',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
  }
];

