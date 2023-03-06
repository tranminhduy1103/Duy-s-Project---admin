import { ID, EntityState } from '@datorama/akita';

export class UserModel {
  firstName: string;
  email: string;
  token: string;
  roles: Array<string>;
};
