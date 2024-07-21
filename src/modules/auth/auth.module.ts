import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";

import { AuthGuard, RolesGuard, StatusGuard } from "src/common/guards";

import { MailModule, UserModule } from "..";

import { AuthService } from "./services";
import { AuthController } from "./controller";
import { GoogleStrategy } from "./strategies";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_LIFE },
      }),
    }),
    UserModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    { provide: APP_GUARD, useClass: StatusGuard },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AuthService,
    GoogleStrategy,
  ],
  exports: [],
})
export class AuthModule {}
