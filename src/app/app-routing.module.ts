import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: '', loadChildren: './home/home.module#HomePageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' },
  { path: 'administration', loadChildren: './administration/administration.module#AdministrationPageModule' },
  { path: 'partner', loadChildren: './partner/partner.module#PartnerPageModule' },
  { path: 'thanks', loadChildren: './thanks/thanks.module#ThanksPageModule' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
