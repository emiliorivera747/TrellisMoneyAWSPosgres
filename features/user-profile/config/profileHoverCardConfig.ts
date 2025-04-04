export const getProfileHoverCardConfig = (userId: string) => [
    {
        label: 'Account details',
        icon: 'UserIcon',
        description: 'View and edit your profile information.',
        url: `/profile/${userId}`,
    },
    {
        label: 'Settings',
        icon: 'CogIcon',
        description: 'Adjust your account settings.',
        url: `/settings`,
    },
];