import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-dashboard.html'
})
export class EmployeeDashboardComponent implements OnInit {

  private authService = inject(AuthService);
  private employeeService = inject(EmployeeService);
   private router = inject(Router);

  activeTab = signal('apply');

  leaveBalances: any[] = [];
  leaveHistory: any[] = [];

  leaveTypeId: number = 1;
  startDate = '';
  endDate = '';
  reason = '';

  successMessage = '';
  errorMessage = '';

  ngOnInit(): void {

    const user = this.authService.currentUser();
      console.log(user);

    if (user?.id) {
      this.loadBalance(user.id);
      this.loadHistory(user.id);
    }
  }

  loadBalance(employeeId: number) {

  this.employeeService
    .getBalance(employeeId)
    .subscribe({
      next: (data: any) => {

        console.log('Balance Data:', data);

        this.leaveBalances = [...data];

      },
      error: (err) => {
        console.error(err);
      }
    });
}

  loadHistory(employeeId: number) {

    this.employeeService
      .getHistory(employeeId)
      .subscribe({
        next: (data: any) => {
          this.leaveHistory = data;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
  changeTab(tab: string) {

  this.activeTab.set(tab);

  const user = this.authService.currentUser();

  if (tab === 'balance' && user?.id) {
    this.loadBalance(user.id);
  }

  if (tab === 'history' && user?.id) {
    this.loadHistory(user.id);
  }
}

  applyLeave() {
     if (!this.startDate || !this.endDate || !this.reason) {
    this.errorMessage = 'Please fill all fields';
    return;
  }

    this.successMessage = '';
    this.errorMessage = '';

    const user = this.authService.currentUser();

    if (!user?.id) {
      this.errorMessage = 'User not found';
      return;
    }

    const request = {
  leaveTypeId: this.leaveTypeId,
  startDate: this.startDate,
  endDate: this.endDate,
  reason: this.reason
};

console.log('Sending Request:', request);

    this.employeeService
      .applyLeave(user.id, request)
      .subscribe({
        next: () => {

  this.successMessage =
    'Leave Applied Successfully';

  this.leaveTypeId = 1;
  this.startDate = '';
  this.endDate = '';
  this.reason = '';

  this.loadHistory(user.id);
  this.loadBalance(user.id);

  setTimeout(() => {
    this.activeTab.set('history');
  }, 1500);

},

        error: (err) => {

          console.error(err);

          this.errorMessage =
            'Failed to apply leave';
        }
      });
  }

  cancelLeave(id: number) {

    if (!confirm('Cancel this leave request?')) {
      return;
    }

    this.employeeService
      .cancelLeave(id)
      .subscribe({
        next: () => {

          const user = this.authService.currentUser();

          if (user?.id) {
            this.loadHistory(user.id);
            this.loadBalance(user.id);
          }
        },

        error: (err) => {
          console.error(err);
        }
      });
  }
  currentUser() {
  return this.authService.currentUser();
}

   logout() {

  this.authService.logout();

  this.router.navigate(['/login']);
}
}