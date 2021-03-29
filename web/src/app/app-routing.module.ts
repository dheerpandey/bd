import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchDetailComponent } from './batch-detail/batch-detail.component';
import { BatchComponent } from './batch/batch.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: BatchComponent },
  { path: 'batch/create', component: BatchComponent },
  { path: 'batch/detail', component: BatchDetailComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
