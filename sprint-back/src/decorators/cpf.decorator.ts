import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsCPFConstraint implements ValidatorConstraintInterface {
  validate(cpf: string): boolean {
    if (!cpf) {
      return false;
    }

    // Remove non-numeric characters
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    let remainder: number;

    // Validate first digit
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i), 10) * (10 - i);
    }

    remainder = sum % 11;
    if (remainder < 2) {
      remainder = 0;
    } else {
      remainder = 11 - remainder;
    }
    if (remainder !== parseInt(cpf.charAt(9), 10)) {
      return false;
    }

    // Validate second digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i), 10) * (11 - i);
    }

    remainder = sum % 11;
    if (remainder < 2) {
      remainder = 0;
    } else {
      remainder = 11 - remainder;
    }
    return remainder === parseInt(cpf.charAt(10), 10);
  }

  defaultMessage(): string {
    return 'CPF is invalid';
  }
}

export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCPFConstraint,
    });
  };
}
