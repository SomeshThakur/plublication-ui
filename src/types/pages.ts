export const pages = {
    "My Publications": "my-publication",
    "All Publications": "all-publication",
    "My Orders": "my-orders",
    "All Orders": "all-orders",
    "My Payments": "my-payments",
    "All Payments": 'all-payments',
    "My Profile": 'my-profile',
    "All Users": "all-users",
    "Dashboard": "dashboard"
} as const;

export type PAGE = keyof typeof pages;

