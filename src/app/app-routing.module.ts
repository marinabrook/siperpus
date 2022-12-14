import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'loader',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule), canLoad: [AuthGuard]
  },
  {
    path: 'request-buku',
    loadChildren: () => import('./request-buku/request-buku.module').then(m => m.RequestBukuPageModule), canLoad: [AuthGuard]
  },
  {
    path: 'form-reqbuk',
    loadChildren: () => import('./modals/form-reqbuk/form-reqbuk.module').then(m => m.FormReqbukPageModule)
  },
  {
    path: 'detail-reqbuk',
    loadChildren: () => import('./modals/detail-reqbuk/detail-reqbuk.module').then(m => m.DetailReqbukPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'loader',
    loadChildren: () => import('./loader/loader.module').then(m => m.LoaderPageModule)
  },
  {
    path: 'daftar',
    loadChildren: () => import('./daftar/daftar.module').then(m => m.DaftarPageModule)
  },
  {
    path: 'buku',
    loadChildren: () => import('./buku/buku.module').then(m => m.BukuPageModule), canLoad: [AuthGuard]
  },
  {
    path: 'detail-buku',
    loadChildren: () => import('./modals/detail-buku/detail-buku.module').then(m => m.DetailBukuPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule), canLoad: [AuthGuard]
  },
  {
    path: 'loan',
    loadChildren: () => import('./loan/loan.module').then(m => m.LoanPageModule)
  },
  {
    path: 'detail-loan',
    loadChildren: () => import('./modals/detail-loan/detail-loan.module').then(m => m.DetailLoanPageModule)
  },
  {
    path: 'lupa',
    loadChildren: () => import('./modals/lupa/lupa.module').then( m => m.LupaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
