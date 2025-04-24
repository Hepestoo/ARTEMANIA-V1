import { CanActivateFn } from '@angular/router';

export const adminAuthGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  if (token && rol === 'admin') {
    return true;
  }

  alert('Acceso denegado. No eres administrador.');
  return false;
};
