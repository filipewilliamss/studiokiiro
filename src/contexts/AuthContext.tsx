import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

type UserRole = "admin" | "client" | "partner" | null;

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: UserRole;
  profile: { full_name: string; company: string | null } | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInCustom: (userId: string, role: UserRole, profileData?: any) => void;
  setSessionRole: (role: UserRole, profileData?: { full_name: string; company: string | null }) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  role: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  signInCustom: () => {},
  setSessionRole: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [profile, setProfile] = useState<{ full_name: string; company: string | null } | null>(null);
  const [loading, setLoading] = useState(true);

  // Separate effect for fetching user data when user changes
  // This avoids the race condition of querying DB inside onAuthStateChange
  useEffect(() => {
    if (!user) {
      setRole(null);
      setProfile(null);
      return;
    }

    // Skip DB fetch for custom mock users (e.g., admin)
    if (user.email?.endsWith("@custom.local")) {
      return;
    }

    let cancelled = false;

    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Retry user_roles fetch — RLS/JWT may take a tick to propagate after signIn
        let rolesData: { role: string }[] | null = null;
        let rolesError: any = null;
        for (let attempt = 0; attempt < 4; attempt++) {
          await new Promise((r) => setTimeout(r, attempt === 0 ? 150 : 300));
          if (cancelled) return;
          const res = await supabase.from("user_roles").select("role").eq("user_id", user.id);
          rolesError = res.error;
          rolesData = res.data;
          if (!res.error && res.data && res.data.length > 0) break;
        }

        const profileRes = await supabase
          .from("profiles")
          .select("full_name, company")
          .eq("user_id", user.id)
          .maybeSingle();

        if (cancelled) return;

        if (rolesData && rolesData.length > 0) {
          // Prefer admin > partner > client when multiple rows
          const priority: Record<string, number> = { admin: 3, partner: 2, client: 1 };
          const best = [...rolesData].sort(
            (a, b) => (priority[b.role] ?? 0) - (priority[a.role] ?? 0)
          )[0];
          setRole(best.role as UserRole);
        } else if (!rolesError) {
          // Confirmed empty (not an RLS/network error) — default to client
          setRole((prev) => prev ?? "client");
        }
        // On error: keep whatever role was already set (e.g. via setSessionRole)

        if (profileRes.data) {
          setProfile(profileRes.data);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        // Don't clobber an existing role on transient errors
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };


    fetchUserData();

    return () => {
      cancelled = true;
    };
  }, [user?.id, user?.email]);

  // Auth listener + initial session
  useEffect(() => {
    let initialized = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (!initialized) {
          initialized = true;
          // If no user, stop loading immediately
          // If user exists, loading will stop after fetchUserData completes (via the other effect)
          if (!session?.user) {
            setLoading(false);
          }
        }
      }
    );

    // Fallback timeout
    const timeout = setTimeout(() => {
      if (!initialized) {
        initialized = true;
        setLoading(false);
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  // Stop loading once role is determined (for logged-in users)
  useEffect(() => {
    if (role !== null && loading) {
      setLoading(false);
    }
  }, [role, loading]);

  const signOut = useCallback(async () => {
    setLoading(true);

    // Clear local state immediately so the UI reacts even if the network call hangs
    setUser(null);
    setSession(null);
    setRole(null);
    setProfile(null);

    // Clear custom session + any Supabase auth tokens stored locally
    try {
      localStorage.removeItem("kiiro_custom_session");
      Object.keys(localStorage)
        .filter((k) => k.startsWith("sb-") && k.endsWith("-auth-token"))
        .forEach((k) => localStorage.removeItem(k));
    } catch {}

    // Fire-and-forget the server sign out (don't block navigation on it)
    supabase.auth.signOut().catch((err) => console.error("Error signing out:", err));

    setLoading(false);

    // Hard navigate so all cached state (queries, realtime, etc.) is wiped
    window.location.href = "/area-do-cliente";
  }, []);



  const signInCustom = useCallback((userId: string, role: UserRole, profileData?: any) => {
    const customSession = { userId, role, profile: profileData };
    localStorage.setItem("kiiro_custom_session", JSON.stringify(customSession));
    
    // Create a mock user object to satisfy the context
    const mockUser = { id: userId, email: `${userId}@custom.local` } as any;
    
    setUser(mockUser);
    setRole(role);
    setProfile(profileData || { full_name: userId, company: null });
    setLoading(false);
  }, []);

  // Check for custom session on mount
  useEffect(() => {
    const stored = localStorage.getItem("kiiro_custom_session");
    if (stored) {
      try {
        const { userId, role, profile } = JSON.parse(stored);
        const mockUser = { id: userId, email: `${userId}@custom.local` } as any;
        setUser(mockUser);
        setRole(role);
        setProfile(profile);
        setLoading(false);
      } catch (e) {
        localStorage.removeItem("kiiro_custom_session");
      }
    }
  }, []);

  const setSessionRole = useCallback(
    (newRole: UserRole, profileData?: { full_name: string; company: string | null }) => {
      setRole(newRole);
      if (profileData) setProfile(profileData);
      setLoading(false);
    },
    []
  );

  return (
    <AuthContext.Provider value={{ user, session, role, profile, loading, signOut, signInCustom, setSessionRole }}>
      {children}
    </AuthContext.Provider>
  );
};
