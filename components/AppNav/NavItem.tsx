"use client";
import type { ComponentType } from "react";
import type { IconProps } from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { styles } from "./styles";

type NavItemProps = {
  href: string;
  icon: ComponentType<IconProps>;
  label: string;
  collapsed: boolean;
  disabled: boolean;
};

export default function NavItem({
  href,
  icon: Icon,
  label,
  collapsed,
  disabled,
}: NavItemProps) {
  const Wrapper = disabled ? "div" : Link;

  return (
    <Wrapper
      {...(!disabled && { href })}
      href={href}
      className={cn(
        styles.navLinkBase,
        collapsed ? styles.navLinkClosed : styles.navLinkOpen,
      )}
    >
      <Icon className={styles.navIcon} />

      {!collapsed && <span className={styles.label}>{label}</span>}
    </Wrapper>
  );
}
