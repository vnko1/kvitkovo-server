import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";
import { templateContacts, templateIcon, templateUrl } from "src/utils";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(mailerOptions: ISendMailOptions) {
    try {
      return await this.mailerService.sendMail(mailerOptions);
    } catch (error) {
      throw new HttpException(
        `Mail service error: ${JSON.stringify(error)}`,
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
  }

  confirmEmailTemp(email: string, confirmationUrl: string) {
    return {
      to: email,
      subject: "Підтвердіть свою пошту",
      template: "confirmEmail",
      context: {
        confirmationUrl,
        logoUrl: templateIcon.logo,
        facebookUrl: templateUrl.facebook,
        facebookIcon: templateIcon.facebook,
        instagramUrl: templateUrl.instagram,
        instagramIcon: templateIcon.instagram,
        youtubeUrl: templateUrl.youtube,
        youtubeIcon: templateIcon.youtube,
        phone: templateContacts.phone,
        email: templateContacts.email,
      },
    };
  }

  temporaryPassTemp(email: string, tempPass: string) {
    return {
      to: email,
      subject: "Тимчасовий пароль",
      template: "tempPass",
      context: {
        tempPass,
        logoUrl: templateIcon.logo,
        facebookUrl: templateUrl.facebook,
        facebookIcon: templateIcon.facebook,
        instagramUrl: templateUrl.instagram,
        instagramIcon: templateIcon.instagram,
        youtubeUrl: templateUrl.youtube,
        youtubeIcon: templateIcon.youtube,
        phone: templateContacts.phone,
        email: templateContacts.email,
      },
    };
  }
}
