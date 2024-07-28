import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthModule } from '../auth.module';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AuthModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login successful', response);
        this.authService.setToken(response.token);  // Stocker le token
        console.log(localStorage.getItem('token'));
        this.router.navigate(['/tasks/list']);
      },
      error => {
        console.error('Login failed', error);
        console.log(localStorage.getItem('token'));
        // Handle login error
      }
    );
  }
}
