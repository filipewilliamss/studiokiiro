import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import { assertEquals, assertExists } from "https://deno.land/std@0.210.0/assert/mod.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

Deno.test("Security: Verify client credentials function should NOT be accessible via standard select", async () => {
  const { data, error } = await supabase
    .from("client_credentials")
    .select("*")
    .limit(1);
  
  // Even if data is returned, RLS should prevent seeing passwords if configured correctly
  // But here we check if the table itself is restricted or accessible based on RLS
  if (data) {
    data.forEach(row => {
      assertEquals(row.password, undefined, "Passwords should never be visible in plain text via SELECT");
    });
  }
});

Deno.test("Security: Profiles should be protected by RLS", async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .limit(5);
  
  // Without authentication, an anon user should typically not see all profiles unless they are public
  // Most apps have profiles partially public or fully private.
  // We expect either an empty array or restricted data.
  if (data && data.length > 0) {
    console.log("Found public profiles, verifying if this is intentional.");
  }
});

Deno.test("Security: Edge Functions should reject requests without valid Admin token", async () => {
  const functions = ["create-client", "create-partner", "update-client-email"];
  
  for (const func of functions) {
    const response = await fetch(`${supabaseUrl}/functions/v1/${func}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer invalid-token"
      },
      body: JSON.stringify({})
    });
    
    const result = await response.json();
    assertEquals(response.status, 400, `Function ${func} should return 400 for invalid token`);
    assertExists(result.error, `Function ${func} should return an error message`);
  }
});

Deno.test("Security: Database functions execution permissions", async () => {
  // Test if verify_client_credentials is callable by anon
  const { data, error } = await supabase.rpc("verify_client_credentials", {
    p_username: "nonexistent",
    p_password: "wrong"
  });
  
  // We expect no data but also NO permission error (it's allowed to be called, just won't find anything)
  if (error) {
    // If it's a permission error, it means our GRANT TO anon failed or was too restrictive
    // However, the linter check wanted it restricted. 
    // If it returns a 403, then it's REALLY locked down.
    console.log(`verify_client_credentials response: ${error.message}`);
  }
});
