// import { Controller } from '@nestjs/common';

// @Controller('auth')
// export class AuthController {}


import {
    Body,Controller,Get, Post,Req, Request,HttpStatus,UseGuards,ValidationPipe,Response,
  } from '@nestjs/common';
  
  import { AuthService } from './auth.service';
  import { AuthCredentialsDto } from './dto/auth-credentials.dto';
  import { JwtAuthGuard } from './guards/jwt-auth.guard';
  import { LocalAuthGuard } from './guards/local-auth.guard';
  import { AuthGuard } from '@nestjs/passport';
  
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Post('/signup')
    async signUp(
      @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
    ): Promise<any> {
      let results = await this.authService.signUp(authCredentialsDto);
      return { message: "Successfully Registered"}
    }
  
    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Request() req) {
      return this.authService.signIn(req.user);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Request() req) {
      return req.user;
    }

    @Get("/facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }
  @Get("/facebook/redirect")
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
    //   data: req.user,
    };
}
  }
