import { inject } from '@angular/core';
import { Routes, Router } from '@angular/router';

const roleGuard = (
  role: 'ROLE_EMPLOYEE' |
        'ROLE_MANAGER' |
        'ROLE_ADMIN'
) => {

  return () => {

    const router = inject(Router);

    const token = localStorage.getItem('token');
    const currentRole = localStorage.getItem('role');

    if (token && currentRole === role) {
      return true;
    }

    router.navigate(['/login']);
    return false;
  };
};

export const routes: Routes = [

  {
  path: 'login',
  loadComponent: () =>
    import('./components/login/login')
      .then(m => m.LoginComponent)
},

  {
    path: 'dashboard/employee',
    loadComponent: () =>
      import('./components/employee-dashboard/employee-dashboard')
        .then(m => m.EmployeeDashboardComponent),
    canActivate: [roleGuard('ROLE_EMPLOYEE')]
  },

  {
    path: 'dashboard/manager',
    loadComponent: () =>
      import('./components/manager-dashboard/manager-dashboard')
        .then(m => m.ManagerDashboardComponent),
    canActivate: [roleGuard('ROLE_MANAGER')]
  },

  {
    path: 'dashboard/hr',
    loadComponent: () =>
      import('./components/hr-dashboard/hr-dashboard')
        .then(m => m.HrDashboardComponent),
    canActivate: [roleGuard('ROLE_ADMIN')]
  },
  

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];