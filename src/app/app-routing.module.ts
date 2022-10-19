import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdimnComponent } from './adimn/adimn.component';
import { DeleteComponent } from './delete/delete.component';
import { EditorComponent } from './editor/editor.component';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { Role } from './model/role';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './service/auth.guard';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: NavbarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: AdimnComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] }
  },
  {
    path: 'delete',
    component: DeleteComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.MANAGER,Role.ADMIN] }
  },
  {
    path: 'update',
    component: UpdateComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.EDITOR,Role.ADMIN] }
  },
  {
    path: 'list',
    component: ManagerComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.EDITOR,Role.ADMIN,Role.MANAGER] }
  },
  // otherwise redirect to home
  {
    path: '',
    component: LoginComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
