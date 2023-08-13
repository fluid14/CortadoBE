import {Body, Controller, Param, Post, Put, Res, UseGuards,} from '@nestjs/common';
import {UserService} from './user.service';
import {ApiKeyAuthGuard} from '../core/auth/guard/apiKeyAuth.guard';
import {Response} from "express";
import {catchError, tap} from "rxjs";
import catchAxiosError from "../core/helpers/catchAxiosError";
import {LoginDto} from "./models/login.dto";
import throwAxiosData from "../core/helpers/throwAxiosData";
import {RegisterDto} from "./models/register.dto";
import {UpdateDto} from "./models/update.dto";
import {ForgotPasswordDto} from "./models/forgot-password.dto";

@UseGuards(ApiKeyAuthGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post('/login')
    login(@Body() body: LoginDto, @Res() res: Response) {
        this.userService.login(body)
            .pipe(
                tap((data) => throwAxiosData(data, res)),
                catchError(err => catchAxiosError(err, res))
            )
            .subscribe();
    }

    @Post('/register')
    register(@Body() body: RegisterDto, @Res() res: Response) {
        this.userService.register(body)
            .pipe(
                tap((data) => throwAxiosData(data, res)),
                catchError(err => catchAxiosError(err, res))
            )
            .subscribe();
    }

    @Put('/:id')
    update(@Body() body: UpdateDto, @Param('id') id: string, @Res() res: Response) {
        this.userService.update(id, body)
            .pipe(
                tap((data) => throwAxiosData(data, res)),
                catchError(err => catchAxiosError(err, res))
            )
            .subscribe();
    }

    @Post('/forgot-password')
    forgotPassword(@Body() body: ForgotPasswordDto, @Res() res: Response) {
        this.userService.forgotPassword(body)
            .pipe(
                tap((data) => throwAxiosData(data, res)),
                catchError(err => catchAxiosError(err, res))
            )
            .subscribe();
    }
}

