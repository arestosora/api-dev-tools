import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDataObject } from './user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async register(data: RegisterUserDataObject) {
        return this.prisma.user.create({ data: { username: data.username, email: data.email, password: await bcrypt.hash(data.password, 10) } });
    }
}

