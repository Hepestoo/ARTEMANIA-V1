import { Controller, Get, Post, Delete, Body, Param, UseGuards, Req, Patch} from '@nestjs/common';
import { SubcategoriasService } from './subcategorias.service';
import { CreateSubcategoriaDto } from './dto/create-subcategoria.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/usuarios/decorators/roles.decorator';
import { RolesGuard } from 'src/usuarios/guards/roles.guard';

@Controller('subcategorias')
export class SubcategoriasController {
  constructor(private readonly subcategoriasService: SubcategoriasService) {}

  @Get()
  async getAll() {
    return this.subcategoriasService.findAll();
  }

  

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Req() req, @Body() createSubcategoriaDto) {
    console.log('User info from request:', req.user);
    return this.subcategoriasService.create(createSubcategoriaDto);
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Patch(':id')
  async update(
    @Param('id') id: number, 
    @Body() updateSubcategoriaDto: CreateSubcategoriaDto,
  ) {
    return this.subcategoriasService.update(id, updateSubcategoriaDto);
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.subcategoriasService.delete(id);
  }
}
