export const pages = {
    "My Publications": "my-publication",
    "All Publications": "all-publication",
    "Create Publication": "create-publication",
    "My Orders": "my-orders",
    "All Orders": "all-orders",
    "My Payments": "my-payments",
    "All Payments": 'all-payments',
    "My Profile": 'my-profile',
    "All Users": "all-users",
    "Create User": 'create-user',
    "Dashboard": "dashboard",
    "Publication Sections": "publication-sections",
    "Create Publication Section": "create-publication-sections",
    "Create Order": "create-order"
} as const;

export type PAGE = keyof typeof pages;

