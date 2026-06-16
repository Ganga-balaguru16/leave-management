import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private http = inject(HttpClient);

  getPendingRequests() {
    return this.http.get(
      'http://localhost:8080/manager/pending'
    );
  }

  approveLeave(id: number) {
    return this.http.put(
      `http://localhost:8080/manager/approve/${id}`,
      {}
    );
  }

  rejectLeave(id: number) {
    return this.http.put(
      `http://localhost:8080/manager/reject/${id}`,
      {}
    );
  }

  getCalendarLeaves() {
  return this.http.get(
    'http://localhost:8080/manager/calendar'
  );
}
}