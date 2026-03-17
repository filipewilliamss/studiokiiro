import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const authHeader = req.headers.get("Authorization");
    
    // Try auth-based admin check first, fall back to service role key check
    let isAdmin = false;
    
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      // Check if it's the service role key itself (for internal calls)
      if (token === Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")) {
        isAdmin = true;
      } else {
        const { data: { user: caller } } = await supabaseAdmin.auth.getUser(token);
        if (caller) {
          const { data: roleData } = await supabaseAdmin
            .from("user_roles")
            .select("role")
            .eq("user_id", caller.id)
            .eq("role", "admin")
            .single();
          if (roleData) isAdmin = true;
        }
      }
    }
    
    if (!isAdmin) throw new Error("Sem permissão de admin");

    const { email, full_name, password } = await req.json();

    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name },
    });

    if (createError) throw createError;

    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: newUser.user.id, role: "partner" });

    if (roleError) throw roleError;

    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ full_name })
      .eq("user_id", newUser.user.id);

    if (updateError) throw updateError;

    return new Response(JSON.stringify({ success: true, user_id: newUser.user.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
