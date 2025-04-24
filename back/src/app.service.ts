import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly dataSource: DataSource) {}

  async onApplicationBootstrap() {
    if (this.dataSource.isInitialized) {
      console.log('Conectado a la base de datos');
    } else {
      console.error('Error: No se pudo conectar a la base de datos');
    }
  }

  getHello(): string {
    return 'Hola Mundo!';
  }
}
