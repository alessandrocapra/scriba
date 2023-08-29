import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const { data: countries } = await supabase.from("countries").select();

  return (
    <main>
      <ul className="my-auto">
        {countries?.map((country) => (
          <li key={country.id}>{country.name}</li>
        ))}
      </ul>
    </main>
  );
}
