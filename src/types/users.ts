export const userRoles = ['Admin', 'Author', 'Distributor', 'Editor'] as const;
export type UserRoleType = typeof userRoles[number];

export type UserRole = {
    "id": number;
    "name": UserRoleType;
};

export type UserDetails = {
    id: string,
    firstName: string,
    lastName: string,
    mobile: string,
    role: UserRole,
    password: string,
};

export type NewUserDetails = {
    first_name: string,
    last_name: string,
    mobile: string,
    role_id: string,
    password: string,
    employee_code: string,
}