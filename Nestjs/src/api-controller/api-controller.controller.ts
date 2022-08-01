import { Controller, Get} from '@nestjs/common';

//@Controller('api-controller')
@Controller({ host: 'api.localhost' })  //added host info api.localhost in /etc/hosts file

export class ApiController {
    @Get() // 같은 루트 경로
    index(): string {
        return 'Hello, API'; // 다른 응답
    }
}
