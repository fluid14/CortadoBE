import {Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {HttpService} from "@nestjs/axios";
import {tap} from "rxjs";

@Injectable()
export class UserService {
    instance;
    constructor(private configService: ConfigService, private httpService: HttpService) {
        this.instance = httpService.head(configService.get<string>('STRAPI_URL'), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${configService.get<string>('STRAPI_API_TOKEN')}`,
            },
        });
    }

    loginUser(data) {
        return this.instance
            .post('api/auth/local', data).pipe(tap(res => console.log(res)));
    };
}
