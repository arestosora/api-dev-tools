import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDataObject } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post('register')
    async register(@Body() data: RegisterUserDataObject) {
        return this.userService.register(data);
    }
}
