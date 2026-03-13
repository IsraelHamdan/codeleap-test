import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";
import ModeToggle from "@/components/theme-toggle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CodeLeap Newtoworking| Login",
};


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <ModeToggle />
      <GravityStarsBackground />
      {children}
    </section>
  );
}