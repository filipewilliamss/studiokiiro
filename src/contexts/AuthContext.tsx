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
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  role: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  signInCustom: () => {},
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
        // Small delay to ensure the auth token is fully propagated
        await new Promise((r) => setTimeout(r, 100));

        const [rolesRes, profileRes] = await Promise.all([
          supabase.from("user_roles").select("role").eq("user_id", user.id),
          supabase.from("profiles").select("full_name, company").eq("user_id", user.id).single(),
        ]);

        if (cancelled) return;

        if (rolesRes.data && rolesRes.data.length > 0) {
          setRole(rolesRes.data[0].role as UserRole);
        } else {
          setRole("client");
        }

        if (profileRes.data) {
          setProfile(profileRes.data);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        if (!cancelled) {
          setRole("client");
          setProfile(null);
        }
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
  }, [user?.id]);

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
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Error signing out:", err);
    }
    // Clear custom session too
    localStorage.removeItem("kiiro_custom_session");
    
    // Always clear state, even if signOut fails
    setUser(null);
    setSession(null);
    setRole(null);
    setProfile(null);
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

  return (
    <AuthContext.Provider value={{ user, session, role, profile, loading, signOut, signInCustom }}>
      {children}
    </AuthContext.Provider>
  );
};
