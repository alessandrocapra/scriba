"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();

    router.refresh();
  };

  return <Button onClick={handleSignOut}>Logout</Button>;
}
