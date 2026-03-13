"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { SignOutIcon } from "@phosphor-icons/react";
import { styles } from "./styles";

interface LogoutButtonProps {
  collapsed: boolean;
  onLogout: () => void;
}

const localStyles = {
  dialogAction: "bg-red-500 text-white hover:bg-red-600",
} as const;

export default function LogoutButton({
  collapsed,
  onLogout,
}: LogoutButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className={cn(
            styles.logoutButton,
            collapsed ? styles.logoutCollapsed : styles.logoutExpanded,
          )}
        >
          <SignOutIcon className={styles.logoutIcon} />
          {!collapsed && <span className={styles.logoutLabel}>Sair</span>}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar logout</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja sair? Você precisará fazer login novamente
            para acessar o sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onLogout} className={localStyles.dialogAction}>
            Sair
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
