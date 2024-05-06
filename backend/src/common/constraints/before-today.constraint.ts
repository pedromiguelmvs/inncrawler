import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { isBefore } from 'date-fns';

export function IsNotBeforeToday(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsNotBeforeToday',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return isBefore(today, new Date(value));
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} não pode ser uma data passada`;
        },
      },
    });
  };
}
