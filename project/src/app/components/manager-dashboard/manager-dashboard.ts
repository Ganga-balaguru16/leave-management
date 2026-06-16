import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ManagerService } from '../../services/manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './manager-dashboard.html',
})
export class ManagerDashboardComponent implements OnInit {

  private authService = inject(AuthService);
  private managerService = inject(ManagerService);
  private router = inject(Router);

  activeTab = signal<'pending' | 'calendar'>('pending');
  pendingRequests: any[] = [];

  calendarLeaves: any[] = [];


currentYear = new Date().getFullYear();
currentMonth = new Date().getMonth();

monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

calendarDays: any[] = [];

  rejectingRequestId = signal<number | null>(null);
  rejectionReason = '';
  ngOnInit(): void {
  this.activeTab.set('pending');
  this.loadPendingRequests();
  this.loadCalendarLeaves();
}

  currentUser() {
    return this.authService.currentUser();
  }

  loadPendingRequests() {

    this.managerService
      .getPendingRequests()
      .subscribe({
      next: (data: any) => {

        console.log('Pending Requests Response:');
        console.log(JSON.stringify(data, null, 2));

        this.pendingRequests = data;
      },
        error: (err) => {
          console.error(err);
        }
      });
  }

  approveRequest(id: number) {

  this.managerService
    .approveLeave(id)
    .subscribe({
      next: () => {

        this.loadPendingRequests();

        // Refresh calendar data
        this.loadCalendarLeaves();

      },
      error: (err) => {
        console.error(err);
      }
    });
}

  openRejectionModal(id: number): void {
    this.rejectingRequestId.set(id);
    this.rejectionReason = '';
  }

  confirmRejection(): void {

    const id = this.rejectingRequestId();

    if (!id) return;

    this.managerService
      .rejectLeave(id)
      .subscribe({
        next: () => {
          this.loadPendingRequests();
          this.rejectingRequestId.set(null);
          this.rejectionReason = '';
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  cancelRejection(): void {
    this.rejectingRequestId.set(null);
    this.rejectionReason = '';
  }


 generateCalendar() {
 
  const firstDay = new Date(
    this.currentYear,
    this.currentMonth,
    1
  );

  const lastDay = new Date(
    this.currentYear,
    this.currentMonth + 1,
    0
  );

  this.calendarDays = [];

  for (let day = 1; day <= lastDay.getDate(); day++) {

    const currentDate = new Date(
      this.currentYear,
      this.currentMonth,
      day
    );

    const dateString =
      `${currentDate.getFullYear()}-${
        String(currentDate.getMonth() + 1).padStart(2, '0')
      }-${
        String(currentDate.getDate()).padStart(2, '0')
      }`;

    const events: any[] = [];

    this.calendarLeaves.forEach((leave: any) => {
      const leaveStart = leave.startDate;
      const leaveEnd = leave.endDate;

      if (
        dateString >= leaveStart &&
        dateString <= leaveEnd
      ) {
        events.push({
          employeeName:
            `${leave.employee.firstName} ${leave.employee.lastName}`,
          leaveType:
            leave.leaveType.leaveName,
          status:
            leave.status
        });
      }

    });

    this.calendarDays.push({
      dayNumber: day,
      dayName: currentDate.toLocaleDateString(
        'en-US',
        { weekday: 'short' }
      ),
      dateString,
      events
    });
  }
}
 
 
  loadCalendarLeaves() {

  this.managerService
    .getCalendarLeaves()
    .subscribe({
      next: (data: any) => {

        console.log('Calendar Data:', data);

        this.calendarLeaves = data;

        this.generateCalendar();


      },
      error: (err) => {
        console.error(err);
      }
    });
}


nextMonth() {

  if (this.currentMonth === 11) {
    this.currentMonth = 0;
    this.currentYear++;
  } else {
    this.currentMonth++;
  }

  this.generateCalendar();
}

previousMonth() {

  if (this.currentMonth === 0) {
    this.currentMonth = 11;
    this.currentYear--;
  } else {
    this.currentMonth--;
  }

  this.generateCalendar();
}
  logout() {

  this.authService.logout();

  this.router.navigate(['/login']);
}
}