import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}
  /*
  GET/users
  GET/users/:id
  POST/users
  PATCH/users/:id
  DELETE/users/:id
  */

  @Get() //GET/users
  findAll(@Query('role') role?: string) {
    return this.userServices.findAll();
  }

  // @Get('interns')
  // findAllInterns() {
  //   return [{}];
  // }

  @Get('getParticularUser/:id')
  findOne(@Param('id') id: number) {
    return this.userServices.findOne(id);
  }

  @Post('create')
  create(
    @Body(ValidationPipe)
    user: CreateUserDto,
  ) {
    return this.userServices.create(user);
  }

  @Patch('updateUser/:id')
  update(
    @Param('id') id: number,
    @Body(ValidationPipe)
    updatedUser: UpdateUserDto,
  ) {
    return this.userServices.update(id, updatedUser);
  }

  @Delete('deleteUser/:id')
  delete(@Param('id') id: number) {
    return this.userServices.delete(id);
  }
}
