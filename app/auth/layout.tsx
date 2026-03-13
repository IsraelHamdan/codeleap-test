import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";
import ModeToggle from "@/components/theme-toggle";
import { authLayoutStyle } from "@/app/tailwindGlobal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CodeLeap Newtoworking| Login",
};


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const styles = authLayoutStyle;

  return (
    <section className={styles.container}>
      <GravityStarsBackground aria-hidden="true" className={styles.background} />
      <div aria-hidden="true" className={styles.overlay} />

      <div className={styles.toggleWrapper}>
        <ModeToggle />
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.contentCard}>{children}</div>
      </div>
    </section>
  );
}
