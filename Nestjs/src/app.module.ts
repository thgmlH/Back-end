import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerController } from './controller/controller.controller';
import { ApiController } from './api-controller/api-controller.controller';
import { CoreModule } from './coremodule';

@Module({
  imports: [CoreModule],
  controllers: [ApiController, AppController, ControllerController], //api controller가 먼저 처리될 수 있게 함 
  providers: [AppService],
  //exports : [Module] //import한 모듈은 다시 내보내기 가능
})
export class AppModule {}


/*
src
├── app.module.ts
├── email
│   ├── email.module.ts
│   └── email.service.ts
├── main.ts
└── users
    ├── UserInfo.ts
    ├── dto
    │   ├── create-user.dto.ts
    │   ├── user-login.dto.ts
    │   └── verify-email.dto.ts
    ├── users.controller.ts
    ├── users.module.ts
    └── users.service.ts
*/
