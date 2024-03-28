import { SetMetadata } from '@nestjs/common';

export const NoHaveLogin = () => SetMetadata('noHaveLogin', true);
