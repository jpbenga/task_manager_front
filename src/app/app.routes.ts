import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { authGuard } from './auth/auth.guard';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: UserRegistrationComponent  },
    {
      path: 'tasks',
      canActivate: [authGuard],
      children: [
        { path: 'list', component: TaskListComponent },
        { path: 'detail', component: TaskDetailComponent },
        { path: 'form', component: TaskFormComponent },
      ]
    },
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' } // Redirection pour les routes non trouvées
  ];
