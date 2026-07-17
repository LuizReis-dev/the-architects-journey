import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { Auth } from '../shared/decorators/auth.decorator'
import { Public } from '../shared/decorators/public.decorator'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserResponseDto } from './dto/user-response.dto'
import { UsersService } from './users.service'

@ApiTags('users')
@Auth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ type: UserResponseDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @ApiOperation({ summary: 'List users' })
  @ApiOkResponse({ type: [UserResponseDto] })
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', example: '507f1f77bcf86cd799439011' })
  @ApiOkResponse({ type: UserResponseDto })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', example: '507f1f77bcf86cd799439011' })
  @ApiOkResponse({ type: UserResponseDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete user' })
  @ApiParam({ name: 'id', example: '507f1f77bcf86cd799439011' })
  @ApiOkResponse({ type: UserResponseDto })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
