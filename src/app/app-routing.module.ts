import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: 'reactiveform',
    component: ReactiveformComponent
  },

  {
    path: 'form',
    component: FormComponent
  },

  {
    path: '**',
    redirectTo: '/form'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
