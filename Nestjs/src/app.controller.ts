import { Controller, Get, Req, Post } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { HttpCode, Param, Query, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto'
import { UserLoginDto } from './dto/userlogin.dto';
import { VerifyEmailDto } from './dto/verifyemail.dto';
import { UserInfo } from './UserInfo';
import { AppModule } from './app.module'; 
import { CommonService } from './commonservice';


@Controller()
export class AppController {
  //constructor(private readonly appService: AppService) {}
  constructor(private readonly commonService: CommonService) { }

  /*@Get()
  getHello(): string {
    return this.appService.getHello();
  } 

  //Route Parameter 방식 : 'http://localhost:3000/hi'
  @Get(':text')    
  test(@Param('text') text: string): string {
    console.log(text);
    return this.appService.test(text);
  }

  //Query 방식: 'http://localhost:3000/?date=0712&weather=맑음'
  @Get()
  getinfo(
    @Query('date') date : string, 
    @Query('weather') weather : string
  ): Object{
      return this.appService.getinfo(date, weather)
  }
  
  @Post('/user')
  create(@Body() createUserDto: CreateUserDto) {
    const { name, email } = createUserDto;

    return `유저를 생성했습니다. 이름: ${name}, 이메일: ${email}`;
  }


  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    console.log(dto);
  }

  @Post('/emailverify')  //curl -X POST http://localhost:3000/emailverify\?signupVerifyToken\=test_token
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    console.log(dto);
    return;
  }

  @Post('/login')  //curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"email": "dexter.haan@gmail.com", "password": "PASSWORD"}'
  async login(@Body() dto: UserLoginDto): Promise<string> {
    console.log(dto);
    return;
  } 

  /*@Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
    console.log(userId);
    return;
  }*/

    @Get('/common-hello')
    getCommonHello(): string {
      return this.commonService.hello();
    }

}
