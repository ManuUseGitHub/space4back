import { refreshUserStateWithSession } from "~/middleware/auth";

export const menuItems = (colorMode: ColorModes, isAdmin: ComputedRef<boolean | 0>) => [
    {
        label: "Home",
        icon: "pi pi-home",
        to: "/home"
    },
    {
        label: "",
        icon: icons.pSun,
        command: () => {
            colorMode.preference = "light";
        }
    },
    {
        label: "",
        icon: icons.pMoon,
        command: () => {
            colorMode.preference = "dark";
        }
    },
    {
        condition: () => {
            return isAdmin;
        },
        label: "Manage",
        icon: icons.pWrench,
        badge: 0,
        items: [
            {
                label: "Users",
                icon: icons.pUser,
                shortcut: "⌘+S",
                to: "/manage/users"
            },
            {
                label: "Skills",
                icon: icons.pStar,
                shortcut: "⌘+B",
                to: "/manage/skills"
            },
            {
                separator: true
            },
            {
                label: "UI Kit",
                icon: "pi pi-pencil",
                shortcut: "⌘+U"
            }
        ]
    }
];
export const getUserMenuComposition = (handleLogout:() => void) => {
    return [
      { label: "Profile", icon: "pi pi-user", to: "/profile" },
      { label: "Settings", icon: "pi pi-cog", to: "/settings" },
      { separator: true },
      { label: "Logout", icon: "pi pi-sign-out", command: () => handleLogout() },
    ]
}
export const forceRerender = async (renderComponent: globalThis.Ref<boolean, boolean>) => {
    // Remove MyComponent from the DOM
    renderComponent.value = false;

    // Wait for the change to get flushed to the DOM
    await nextTick();

    // Add the component back in
    renderComponent.value = true;
};
export const loadProfile = async (
    principal: globalThis.Ref<any, any>,
    userMenu: globalThis.Ref<any, any>
) => {
    const menuItem = userMenu.value.find((m: any) => /profile/i.test(m.label!));
    if (menuItem) {
        menuItem.to = `/u/${principal.value?.userId}`;
    }
};

export const applyProfile = (
    principal: globalThis.Ref<any, any>,
    roles: globalThis.Ref<string[], string[]>,
    userMenu: globalThis.Ref<any, any>
) => {
    async () => {
        refreshUserStateWithSession().then(value => {
            principal.value = value;
            roles.value = principal.value.role?.split(",") || ["user"];
            loadProfile(principal, userMenu);
        });
    };
};
