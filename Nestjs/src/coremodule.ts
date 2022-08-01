import { Module } from '@nestjs/common';
import { CommonModule } from './commonmodule';

@Module({
    imports: [CommonModule],
    exports: [CommonModule],
})
export class CoreModule { }