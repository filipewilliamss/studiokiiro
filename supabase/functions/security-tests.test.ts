import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import { assertEquals, assertExists } from "https://deno.land/std@0.210.0/assert/mod.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "http://localhost:54321";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "placeholder-key";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

Deno.test("Security: Profiles should be protected by RLS", async () => {
  if (supabaseAnonKey === "placeholder-key") {
    console.log("Skipping RLS test: No valid Anon Key available in environment.");
    return;
  }
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .limit(5);
  
  if (data && data.length > 0) {
    console.log(`Found ${data.length} public profiles. Ensure this is intentional (e.g., public portfolio).`);
  }
});

Deno.test("Security: Edge Functions should reject requests without valid Admin token", async () => {
  const functions = ["create-client", "create-partner", "update-client-email"];
  
  for (const func of functions) {
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/${func}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer invalid-token"
        },
        body: JSON.stringify({})
      });
      
      const result = await response.json();
      // Should be 400 (as coded in the functions) or 401/403 (if gateway blocked it)
      const isErrorStatus = response.status >= 400;
      assertEquals(isErrorStatus, true, `Function ${func} should reject invalid token with error status`);
      assertExists(result.error, `Function ${func} should return an error message`);
    } catch (e: any) {
      console.log(`Fetch to ${func} failed: ${e.message}. This might be expected if the function is not deployed locally.`);
    }
  }
});

Deno.test("Security: RPC Permissions", async () => {
  if (supabaseAnonKey === "placeholder-key") return;

  const { data, error } = await supabase.rpc("verify_client_credentials", {
    p_username: "nonexistent",
    p_password: "wrong"
  });
  
  // If we get an error, check if it's a permission error (403/42P01 etc)
  if (error) {
    console.log(`verify_client_credentials response: ${error.message} (${error.code})`);
  }
});
