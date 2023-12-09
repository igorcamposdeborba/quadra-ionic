import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./view/login/login-routing.module').then( m => m.LoginPageRoutingModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./view/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./view/admin/admin.module').then( m => m.AdminPageModule),
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard]
  },
  {
    path: 'schedule',
    loadChildren: () => import('./view/schedule/schedule.module').then(m => m.SchedulePageModule),
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard]
  },
  {
    path: 'schedule/:id', // Rota com parâmetro de ID
    loadChildren: () => import('./view/schedule/schedule.module').then(m => m.SchedulePageModule),
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
