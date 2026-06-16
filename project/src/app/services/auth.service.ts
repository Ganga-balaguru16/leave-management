import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  login(data: any) {

    return this.http.post(
      'http://localhost:8080/auth/login',
      data
    );
  }

  register(data: any) {

    return this.http.post(
      'http://localhost:8080/auth/register',
      data
    );
  }

  currentUser() {
  return {
    id: Number(localStorage.getItem('id')),
    name: localStorage.getItem('name'),
    role: localStorage.getItem('role'),
    department: localStorage.getItem('department')
  };
}

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    localStorage.removeItem('department');
  }

  isLoggedIn() {

    return !!localStorage.getItem('token');
  }
}