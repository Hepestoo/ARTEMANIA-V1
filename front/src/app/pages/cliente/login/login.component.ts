import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  mostrarPassword: boolean = false;

togglePasswordVisibility() {
  this.mostrarPassword = !this.mostrarPassword;
}


  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.error = '';
    this.http.post<{ access_token: string }>('http://localhost:3000/users/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.access_token);

        const payload = JSON.parse(atob(res.access_token.split('.')[1]));
        localStorage.setItem('rol', payload.role);
        localStorage.setItem('usuario_id', payload.id); // opcional para ordenes

        if (payload.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: () => {
        this.error = 'Credenciales incorrectas';
      }
    });
  }
}
