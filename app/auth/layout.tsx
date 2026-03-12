import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";
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
      <GravityStarsBackground />
      {children}
    </section>
  );
}