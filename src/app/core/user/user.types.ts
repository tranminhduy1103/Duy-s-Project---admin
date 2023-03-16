export interface User
{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
    accountType: Array<string>;
    roles: Array<string>;
    userName: string;
}
