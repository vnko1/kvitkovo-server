import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { getPath } from 'src/utils';

import { MailService } from './services/mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => {
        const templatesDir = getPath(
          process.cwd(),
          'src',
          'modules',
          'mail',
          'templates',
        );
        return {
          transport: process.env.MAIL_URL,
          defaults: {
            from: process.env.MAIL_SENDER,
          },
          template: {
            dir: templatesDir,
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
