'use client';
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formStyle } from "../tailwindGlobal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/lib/validations/user.schema";
import { useAuth } from "@/components/AuthContext";

export default function Login() {

  const router = useRouter();
  const { login } = useAuth();

  /*this form was created using TanStack Form, 
  If this application used authentication, we would need to send the login payload. This payload could be:

  { email: "", password: ""}, depending on the contract or backend. In this project,

  we do not use an API to authenticate users, therefore it is not necessary.  maybe {email: "", password: ""}  depends on contract o backend, in this project 
  we do not use API to authenticate users, so it's not necessary

  */
  const form = useForm({
    defaultValues: {
      username: ""
    },
    validators: {
      onBlur: loginSchema
    },
    onSubmit: async ({ value }) => {
      const parsedValues = loginSchema.safeParse(value);
      if (parsedValues.success) {
        login(parsedValues.data);
        toast.success("Your verification was completed successfully.");
        router.push("/");
      }
    }
  });


  return (
    <form onSubmit={form.handleSubmit} className={formStyle.formContainer}>
      <form.Field name="username">
        {(field) => (
          <div className={formStyle.inputWrapper}>
            <Label className="text-sm text-accent-foreground">Username</Label>
            <Input
              type="text"
              onChange={(e) => field.handleChange(e.target.value)}
              value={form.state.values.username}
              className={formStyle.fieldInput}
              placeholder="Seu nome de usuário"
            />
          </div>
        )}
      </form.Field>
      <form.Subscribe
        selector={(state) => ({
          canSubmit: state.canSubmit,
          isSubmitting: state.isSubmitting,
        })}>
        {({ canSubmit, isSubmitting }) => (
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className={formStyle.submitButton}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
} 