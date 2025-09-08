import { Routes } from '@angular/router';

export const routes: Routes = [
  // Example route placeholder; app can add routes later
  { path: 'rate', loadComponent: () => import('./app.component') },
];
