import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';

 

  errorMessage = '';

  
onSubmit() {

  this.errorMessage = '';

  const payload = {
    email: this.email,
    password: this.password
  };

  this.authService.login(payload)
    .subscribe({
      next: (res: any) => {

        console.log('Login Success', res);
        localStorage.setItem(
  'id',
  res.id.toString()
);

        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('name', res.name);

        // Navigate based on role from backend
        if (res.role === 'ROLE_EMPLOYEE') {
  this.router.navigate(['/dashboard/employee']);
}
else if (res.role === 'ROLE_MANAGER') {
  this.router.navigate(['/dashboard/manager']);
}
else if (res.role === 'ROLE_ADMIN') {
  this.router.navigate(['/dashboard/hr']);
}
else {
  this.errorMessage = 'Role not recognized';
}
        
      },

      error: (err) => {

        console.error(err);

        this.errorMessage =
          'Invalid email or password';
      }
    });
}
}