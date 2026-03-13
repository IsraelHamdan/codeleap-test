import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  useSidebar,
} from "../ui/sidebar";

import LogoutButton from "./LogoutButton";
import { styles } from "./styles";
import NavItem from "./NavItem";
import { useAuth } from "../AuthContext";
import { HouseIcon, UserIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export default function AppNav() {
  const { username, logout } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const pathname = usePathname();

  const ROUTES_WITHOUT_SIDEBAR = ["/auth"];
  if (ROUTES_WITHOUT_SIDEBAR.some((r) => pathname?.startsWith(r))) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" className={styles.container}>
      {/* TOPO */}
      <SidebarHeader className={styles.header}>
        <div
          className={cn(
            styles.headerInner,
            collapsed ? styles.headerInnerCollapsed : styles.headerInnerExpanded,
          )}
        >
          <div className={styles.userLogo}>
            <UserIcon className={styles.userLogoIcon} />
          </div>

          <p
            className={cn(
              styles.userNameBase,
              collapsed ? styles.userNameCollapsed : styles.userNameExpanded,
            )}
          >
            {username}
          </p>
        </div>
      </SidebarHeader>
      {/* NAVEGAÇÃO */}
      <SidebarContent className={styles.content}>
        <nav className={styles.nav}>
          <NavItem
            disabled={false}
            collapsed={collapsed}
            href="/dashboard"
            icon={HouseIcon}
            label="Início"
          />
          <NavItem
            disabled={false}
            collapsed={collapsed}
            href="/profile"
            icon={UserIcon}
            label="Perfil"
          />
        </nav>
      </SidebarContent>

      {/* LOGOUT */}
      <SidebarFooter>
        <LogoutButton
          collapsed={collapsed}
          onLogout={() => {
            logout();
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
