import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { InviteComponent } from './invite/invite.component';
import { AdminComponent } from './admin.component';

const adminRoutes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'users', component: UserAdminComponent },
  { path: 'invite', component: InviteComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
