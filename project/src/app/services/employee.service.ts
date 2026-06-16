import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);

  getHistory(employeeId: number) {
    return this.http.get(
      `http://localhost:8080/employee/history?employeeId=${employeeId}`
    );
  }

  getBalance(employeeId: number) {
    return this.http.get(
      `http://localhost:8080/employee/balance?employeeId=${employeeId}`
    );
  }

  applyLeave(employeeId: number, data: any) {
    return this.http.post(
      `http://localhost:8080/employee/apply?employeeId=${employeeId}`,
      data
    );
  }

  cancelLeave(id: number) {
  return this.http.put(
    `http://localhost:8080/employee/cancel/${id}`,
    {}
  );
}
}