import { ValidatorOptions } from 'class-validator';
import { ValidationError } from 'class-validator/types/validation/ValidationError';

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}
