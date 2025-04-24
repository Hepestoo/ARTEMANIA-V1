import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  // Obtener el carrito
  @Get()
  getCarrito(
    @Query('usuario_id') usuario_id?: number,
    @Query('session_id') session_id?: string,
  ) {
    return this.carritoService.getCarrito(usuario_id, session_id);
  }

  // Agregar item al carrito
  @Post('add')
  addItem(@Body() dto: AddItemDto) {
    return this.carritoService.addItem(dto);
  }

  // Actualizar cantidad de un item
  @Put('item/:id')
  updateItem(@Param('id') id: number, @Body() dto: UpdateItemDto) {
    return this.carritoService.updateItem(id, dto);
  }

  // Eliminar item del carrito
  @Delete('item/:id')
  removeItem(@Param('id') id: number) {
    return this.carritoService.removeItem(id);
  }

  // Vaciar todo el carrito
  @Delete('clear')
  clearCarrito(
    @Query('usuario_id') usuario_id?: number,
    @Query('session_id') session_id?: string,
  ) {
    return this.carritoService.clear(usuario_id, session_id);
  }
}
