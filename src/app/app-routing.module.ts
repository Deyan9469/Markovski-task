import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { RouteGuard } from './app-guard';

const routes: Routes = [
  { path: "", pathMatch: 'full', component: HomeComponent },
  { path: "create", component: CreateComponent, canActivate: [RouteGuard] },
  { path: "edit/:userId", component: EditComponent, canActivate: [RouteGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
