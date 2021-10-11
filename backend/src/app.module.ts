import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'process';
import { FacebookStrategy } from "./auth/strategies/facebook.strategy";

// import config from './config/keys'



@Module({
  imports: [AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI)
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
  
  ],
  controllers: [AppController],
  providers: [AppService,FacebookStrategy],
})
export class AppModule {}

