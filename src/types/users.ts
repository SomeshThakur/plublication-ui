export const userRoles = ['Admin', 'Author', 'Distributor', 'Editor'] as const;
export type UserType = typeof userRoles[number];