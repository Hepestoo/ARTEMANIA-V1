import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('Required Roles:', requiredRoles);

    if (!requiredRoles) {
      console.log('No roles required, access granted.');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      console.log('Authorization header missing');
      return false;
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      console.log('Invalid Authorization header format');
      return false;
    }

    try {
      const user = this.jwtService.verify(token);
      console.log('Decoded User:', user);

      if (!user.role) {
        console.log('Role field missing in token');
        return false;
      }

      // Verificación del rol del usuario
      const hasRole = requiredRoles.includes(user.role);
      console.log('Has required role:', hasRole);

      if (!hasRole) {
        console.log(`User role (${user.role}) not authorized for this action.`);
        return false;
      }

      // Asignar el usuario al request para uso posterior
      request.user = user;
      console.log('Access granted');
      return true;
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return false;
    }
  }
}
