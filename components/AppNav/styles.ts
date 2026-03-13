export const styles = {
  container: `
    [&_[data-sidebar=sidebar]]:bg-sidebar
    [&_[data-sidebar=sidebar]]:text-sidebar-foreground
    flex flex-col h-full
    max-w-[var(--sidebar-width)]
    sm:max-w-[var(--sidebar-width)]
    max-sm:max-w-[var(--sidebar-width-mobile)]
  `,
  header: `
    flex flex-col items-center gap-4 pt-4
  `,
  headerInner: `
    flex items-center transition-all duration-200
  `,
  headerInnerCollapsed: `
    flex-col gap-1
  `,
  headerInnerExpanded: `
    w-full flex-row gap-3 px-3
  `,
  content: `
    flex-1 flex flex-col justify-between py-6
  `,
  nav: `
    flex flex-col gap-6 w-full px-4 items-start
  `,
  logoutButton: `
    flex w-full items-center gap-3 rounded-xl p-2.5
    text-red-500 hover:bg-red-50 hover:text-red-400
    transition-all duration-200
    cursor-pointer
    dark:hover:bg-red-500/10
  `,
  logoutCollapsed: `
    justify-center
  `,
  logoutExpanded: `
    px-3
  `,
  logoutLabel: `
    text-sm font-medium leading-none
    transition-all duration-200
  `,
  logoutIcon: `
    size-[1.15rem] shrink-0
  `,

  navLinkOpen: `
  flex h-11 w-full items-center gap-3.5
  rounded-xl
  px-3 py-2.5
  text-sm font-medium
  text-foreground
  transition-colors duration-200
  hover:bg-zinc-200/80
  dark:hover:bg-slate-800
`,

  navLinkClosed: `
  flex h-11 w-full items-center justify-center
  rounded-xl
  px-2 py-2.5
  text-sm font-medium
  text-foreground
  transition-colors duration-200
  hover:bg-zinc-200/80
  dark:hover:bg-slate-800
`,

  navLinkBase: `
  transition-colors
`,
  navIcon: `
  size-[1.35rem] shrink-0
`,
  label: `
  text-sm font-medium leading-tight
  transition-colors
  opacity-100
`,

  userNameBase: `
    whitespace-nowrap transition-all duration-200
  `,

  userLogo: `
    flex h-12 w-12 items-center justify-center overflow-hidden rounded-full
    bg-muted
    text-muted-foreground
  `,
  userLogoIcon: `
    size-7 shrink-0
  `,
  userNameCollapsed: `
    text-xs text-center truncate
  `,
  userNameExpanded: `
    text-base font-medium
  `,
};
