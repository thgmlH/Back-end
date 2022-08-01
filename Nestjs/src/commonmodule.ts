import { Module } from '@nestjs/common';
import { CommonService } from './commonservice';

@Module({
    providers: [CommonService],
    exports: [CommonService],
})
export class CommonModule { }