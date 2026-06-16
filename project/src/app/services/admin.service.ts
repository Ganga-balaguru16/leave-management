import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);

  // Employee APIs

  getEmployees() {
    return this.http.get(
      'http://localhost:8080/admin/employees'
    );
  }

  addEmployee(data: any) {
    return this.http.post(
      'http://localhost:8080/admin/employees',
      data
    );
  }

  updateEmployee(id: number, data: any) {
    return this.http.put(
      `http://localhost:8080/admin/employees/${id}`,
      data
    );
  }

  deleteEmployee(id: number) {
    return this.http.delete(
      `http://localhost:8080/admin/employees/${id}`
    );
  }

  // Department APIs

  getDepartments() {
    return this.http.get(
      'http://localhost:8080/admin/departments'
    );
  }

  addDepartment(data: any) {
    return this.http.post(
      'http://localhost:8080/admin/departments',
      data
    );
  }

  updateDepartment(id: number, data: any) {
    return this.http.put(
      `http://localhost:8080/admin/departments/${id}`,
      data
    );
  }

  deleteDepartment(id: number) {
    return this.http.delete(
      `http://localhost:8080/admin/departments/${id}`
    );
  }

  // Leave Type APIs

  getLeaveTypes() {
    return this.http.get(
      'http://localhost:8080/admin/leave-types'
    );
  }

  addLeaveType(data: any) {
    return this.http.post(
      'http://localhost:8080/admin/leave-types',
      data
    );
  }

  updateLeaveType(id: number, data: any) {
    return this.http.put(
      `http://localhost:8080/admin/leave-types/${id}`,
      data
    );
  }

  deleteLeaveType(id: number) {
    return this.http.delete(
      `http://localhost:8080/admin/leave-types/${id}`
    );
  }
}