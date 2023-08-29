"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: "/journal",
      },
    });
    router.refresh();
  };

  return <Button onClick={handleSignIn}>Signin with Google</Button>;
}
