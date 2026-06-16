import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hr-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hr-dashboard.html'
})
export class HrDashboardComponent implements OnInit {

  private authService = inject(AuthService);
  private adminService = inject(AdminService);
  private router = inject(Router);

  activeTab = signal<'employees' | 'departments' | 'types'>('employees');

  employees: any[] = [];
  departments: any[] = [];
  leaveTypes: any[] = [];

  ngOnInit(): void {
    this.loadEmployees();
    this.loadDepartments();
    this.loadLeaveTypes();
  }

  currentUser() {
    return this.authService.currentUser();
  }

  loadEmployees() {
  this.adminService.getEmployees().subscribe({
    next: (data: any) => {
      console.log('Employees:', data);
      this.employees = data;
    }
  });
}

loadDepartments() {
  this.adminService.getDepartments().subscribe({
    next: (data: any) => {
      console.log('Departments:', data);
      this.departments = data;
    }
  });
}

loadLeaveTypes() {
  this.adminService.getLeaveTypes().subscribe({
    next: (data: any) => {
      console.log('Leave Types:', data);
      this.leaveTypes = data;
    }
  });
}
showEmployeeModal = false;
showDepartmentModal = false;
showLeaveTypeModal = false;

employeeForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: ''
};

departmentForm = {
  departmentName: '',
  description: ''
};

leaveTypeForm = {
  leaveName: '',
  description: '',
  maxDays: 0
};



openEmployeeModal(employee?: any) {

  this.editingEmployee = employee || null;

  if (employee) {

    this.employeeForm = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      password: '',
      role: employee.role?.roleName || ''
    };

  } else {

    this.employeeForm = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: ''
    };

  }

  this.showEmployeeModal = true;
}

openDepartmentModal(department?: any) {

  this.editingDepartment = department || null;

  if (department) {

    this.departmentForm = {
      departmentName: department.departmentName,
      description: department.description
    };

  }

  this.showDepartmentModal = true;
}

openLeaveTypeModal(type?: any) {

  this.editingLeaveType = type || null;

  if (type) {

    this.leaveTypeForm = {
      leaveName: type.leaveName,
      description: type.description,
      maxDays: type.maxDays
    };

  }

  this.showLeaveTypeModal = true;
}

editingEmployee: any = null;
editingDepartment: any = null;
editingLeaveType: any = null;

addEmployee() {

  const roleMap: any = {
    ROLE_EMPLOYEE: 1,
    ROLE_MANAGER: 2,
    ROLE_ADMIN: 3
  };

  const payload = {
    firstName: this.employeeForm.firstName,
    lastName: this.employeeForm.lastName,
    email: this.employeeForm.email,
    password: this.employeeForm.password,

    role: {
      id: roleMap[this.employeeForm.role]
    }
  };

  console.log(payload);

  this.adminService.addEmployee(payload)
    .subscribe({
      next: () => {
        this.loadEmployees();
        this.showEmployeeModal = false;
      },
      error: (err) => console.error(err)
    });
}

deleteEmployee(id: number) {

  if (!confirm('Delete Employee?')) return;

  this.adminService.deleteEmployee(id)
    .subscribe({
      next: () => {
        
        this.loadEmployees(); // refresh table
      }
    });
}


addDepartment() {
  this.adminService.addDepartment(this.departmentForm)
    .subscribe(() => {

      this.loadDepartments();

      this.departmentForm = {
        departmentName: '',
        description: ''
      };

      this.showDepartmentModal = false;
    });
}

addLeaveType() {
  this.adminService.addLeaveType(this.leaveTypeForm)
    .subscribe(() => {

      this.loadLeaveTypes();

      this.leaveTypeForm = {
        leaveName: '',
        description: '',
        maxDays: 0
      };

      this.showLeaveTypeModal = false;
    });
}

deleteDepartment(id: number) {

  if (!confirm('Delete Department?')) return;

  this.adminService.deleteDepartment(id)
    .subscribe({
      next: () => {
        this.loadDepartments();
      }
    });
}

deleteLeaveType(id: number) {

  if (!confirm('Delete Leave Type?')) return;

  this.adminService.deleteLeaveType(id)
    .subscribe({
      next: () => {
        this.loadLeaveTypes();
      }
    });
}

updateEmployee() {

  const roleMap: any = {
    ROLE_EMPLOYEE: 1,
    ROLE_MANAGER: 2,
    ROLE_ADMIN: 3
  };

  const payload = {
    firstName: this.employeeForm.firstName,
    lastName: this.employeeForm.lastName,
    email: this.employeeForm.email,

    role: {
      id: roleMap[this.employeeForm.role]
    }
  };

  

  this.adminService.updateEmployee(
    this.editingEmployee.id,
    payload
  ).subscribe({
    next: () => {

      this.loadEmployees();

      this.showEmployeeModal = false;

      this.editingEmployee = null;

    
    },
    error: (err) => {
      console.error(err);
      console.log(err.error);
    }
  });
}

updateDepartment() {

  this.adminService.updateDepartment(
    this.editingDepartment.id,
    this.departmentForm
  ).subscribe({
    next: () => {

      this.loadDepartments();

      this.showDepartmentModal = false;

      this.editingDepartment = null;
    }
  });

}

updateLeaveType() {

  this.adminService.updateLeaveType(
    this.editingLeaveType.id,
    this.leaveTypeForm
  ).subscribe({
    next: () => {

      this.loadLeaveTypes();

      this.showLeaveTypeModal = false;

      this.editingLeaveType = null;
    }
  });

}


 logout() {

  this.authService.logout();

  this.router.navigate(['/login']);
}
}