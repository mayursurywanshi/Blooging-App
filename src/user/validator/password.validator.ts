import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'StrongPassword', async: false })
export class StrongPassword implements ValidatorConstraintInterface {

  validate(value: string): boolean {
    // Minimum 8 chars, at least 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordRegex.test(value);
  }

  defaultMessage(): string {
    return 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character';
  }
}
