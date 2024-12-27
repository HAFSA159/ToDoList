import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { NgModule } from '@angular/core';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent  },
    { path: 'tasks', component: TaskListComponent },
    { path: 'task-form', component: TaskFormComponent },
    { path: 'categories', component: CategoriesListComponent },
    {path: 'category-form',component:CategoryFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule], 
})
export class AppRoutingModule {}