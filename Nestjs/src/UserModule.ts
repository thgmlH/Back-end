import { Module } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { EmailModule } from './EmailModule';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [EmailModule],
  controllers: [UsersController],
  providers: [UsersService, EmailService],
})
export class UsersModule { }