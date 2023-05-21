import { SetMetadata } from '@nestjs/common';
import { Role } from '../models/role.enum';

// CAI NAY NHU KIEU LA PHAN QUYEN ROLE
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
