import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from "./user/user.component"
import { StageComponent } from "./stage/stage.component";

const routes: Routes = [
  { path: "login", component: UserComponent },
  { path: "stage", component: StageComponent },
  { path: "", pathMatch: "full", redirectTo: "/login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }