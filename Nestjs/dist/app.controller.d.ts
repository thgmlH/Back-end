import { CommonService } from './commonservice';
export declare class AppController {
    private readonly commonService;
    constructor(commonService: CommonService);
    getCommonHello(): string;
}
