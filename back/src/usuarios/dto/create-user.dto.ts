export class CreateUserDto {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    rol?: string;
    isActive?: boolean;
  }