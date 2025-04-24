import { Controller, Post, Body, Get, Query, Patch, Param, UseGuards, Req, UnauthorizedException, Delete } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/usuarios/guards/roles.guard';
import { Roles } from 'src/usuarios/decorators/roles.decorator';

@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) { }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  getAll() {
    return this.ordenesService.findAll();
  }


  @Post()
  async crearOrden(@Body() dto: CreateOrdenDto) {
    return this.ordenesService.crearOrden(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('usuario')
  async listarPorUsuario(
    @Query('usuario_id') usuario_id: number,
    @Req() req
  ) {
    const user = req.user;

    // Si no es admin y quiere ver órdenes de otro usuario, bloquear
    if (user.role !== 'admin' && user.userId !== usuario_id) {
      throw new UnauthorizedException('No autorizado');
    }

    return this.ordenesService.listarPorUsuario(usuario_id);
  }


  @Get('anonimo')
  async listarPorSession(@Query('session_id') session_id: string) {
    return this.ordenesService.listarPorSession(session_id);
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Patch(':id/estado')
  actualizarEstado(@Param('id') id: number, @Body() dto: UpdateEstadoDto) {
    return this.ordenesService.actualizarEstado(id, dto.estado);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.ordenesService.eliminar(id);
  }


  @Patch(':id/datos')
  actualizarDatosCliente(
    @Param('id') id: number,
    @Body() dto: UpdateEstadoDto
  ) {
    return this.ordenesService.actualizarDatosCliente(id, dto);
  }



}
