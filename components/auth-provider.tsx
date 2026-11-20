"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

export interface AuthUser {
  id?: string;
  name?: string | null;
  email?: string | null;
}

interface AuthError {
  code?: string;
  message?: string;
}

interface AuthResult {
  data?: { user?: AuthUser | null } | null;
  error?: AuthError | null;
}

interface NeonAuthClient {
  signUp: {
    email(input: { name: string; email: string; password: string }): Promise<AuthResult>;
  };
  signIn: {
    email(input: { email: string; password: string }): Promise<AuthResult>;
  };
  signOut(): Promise<AuthResult>;
  getSession(): Promise<{ data?: { user?: AuthUser | null } | null }>;
  requestPasswordReset(input: { email: string; redirectTo?: string }): Promise<AuthResult>;
  resetPassword(input: { newPassword: string; token: string | null }): Promise<AuthResult>;
}

const errorMessages: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
  USER_ALREADY_EXISTS: "ไม่สามารถสมัครด้วยอีเมลนี้ได้ กรุณาลองเข้าสู่ระบบ",
  EMAIL_NOT_VERIFIED: "กรุณายืนยันอีเมลก่อนเข้าสู่ระบบ",
  PASSWORD_TOO_SHORT: "รหัสผ่านสั้นเกินไป",
  TOO_MANY_REQUESTS: "มีการลองหลายครั้งเกินไป กรุณารอสักครู่แล้วลองใหม่",
};

type Mode = "signin" | "signup" | "forgot" | "reset";

interface AuthContextValue {
  user: AuthUser | null;
  ready: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  signOut: () => Promise<void>;
  requestAuth: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside <AuthProvider>");
  return value;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("signin");
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const clientRef = useRef<NeonAuthClient | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const getClient = useCallback(async (): Promise<NeonAuthClient> => {
    if (clientRef.current) return clientRef.current;
    // Same-origin client: requests go to /api/auth on this site, which proxies
    // to Neon Auth, so the session cookie is first-party and not blocked.
    const mod = (await import("@neon/auth/next")) as unknown as {
      createAuthClient: () => NeonAuthClient;
    };
    const client = mod.createAuthClient();
    clientRef.current = client;
    return client;
  }, []);

  useEffect(() => {
    let cancelled = false;
    getClient()
      .then((client) => client.getSession())
      .then((session) => {
        if (!cancelled) setUser(session.data?.user ?? null);
      })
      .catch(() => {
        /* ยังไม่ล็อกอินหรือเซิร์ฟเวอร์ auth ไม่ตอบ — ใช้แบบผู้เยี่ยมชม */
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [getClient]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      setResetToken(token);
      setMode("reset");
      setOpen(true);
    } else if (params.has("reset")) {
      setMode("forgot");
      setOpen(true);
    } else if (params.has("error")) {
      setError("ลิงก์ตั้งรหัสผ่านไม่ถูกต้องหรือหมดอายุ กรุณาขอใหม่");
      setMode("signin");
      setOpen(true);
    }
    if (params.get("token") || params.has("reset") || params.has("error")) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => emailRef.current?.focus(), 30);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      window.clearTimeout(timer);
    };
  }, [open]);

  const openAuth = useCallback(() => {
    if (user) {
      setMode("signin");
    }
    setError("");
    setNotice("");
    setOpen(true);
  }, [user]);

  const closeAuth = useCallback(() => setOpen(false), []);

  const signOut = useCallback(async () => {
    const client = await getClient();
    await client.signOut();
    setUser(null);
    setOpen(false);
  }, [getClient]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError("");
      setNotice("");
      setPending(true);
      const form = event.currentTarget;
      const data = new FormData(form);
      const email = String(data.get("email") ?? "").trim();
      const password = String(data.get("password") ?? "");
      const name = String(data.get("name") ?? "").trim() || email.split("@")[0] || "นักอ่าน";

      try {
        const client = await getClient();
        if (mode === "signup") {
          const result = await client.signUp.email({ name, email, password });
          if (result.error) throw result.error;
          const session = await client.getSession();
          if (session.data?.user) {
            setUser(session.data.user);
            setOpen(false);
          } else {
            setNotice("สมัครเรียบร้อย กรุณาตรวจสอบอีเมลหรือเข้าสู่ระบบ");
            setMode("signin");
          }
        } else if (mode === "signin") {
          const result = await client.signIn.email({ email, password });
          if (result.error) throw result.error;
          // Use the user from the sign-in response so the session is active
          // immediately, without waiting for a second session request.
          if (result.data?.user) {
            setUser(result.data.user);
          } else {
            const session = await client.getSession();
            setUser(session.data?.user ?? null);
          }
          setOpen(false);
        } else if (mode === "forgot") {
          const result = await client.requestPasswordReset({
            email,
            redirectTo: `${window.location.origin}/?reset=1`,
          });
          if (result.error) throw result.error;
          setNotice("หากอีเมลนี้มีบัญชีอยู่ เราจะส่งคำแนะนำให้");
        } else {
          const result = await client.resetPassword({ newPassword: password, token: resetToken });
          if (result.error) throw result.error;
          setMode("signin");
          setNotice("เปลี่ยนรหัสผ่านแล้ว กรุณาเข้าสู่ระบบ");
        }
      } catch (caught) {
        const code = (caught as AuthError | null)?.code;
        setError((code && errorMessages[code]) || "ทำรายการไม่สำเร็จ กรุณาตรวจสอบข้อมูลแล้วลองอีกครั้ง");
      } finally {
        setPending(false);
      }
    },
    [getClient, mode, resetToken],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      ready,
      openAuth,
      closeAuth,
      signOut,
      requestAuth: openAuth,
    }),
    [user, ready, openAuth, closeAuth, signOut],
  );

  const showName = mode === "signup";
  const showPassword = mode !== "forgot";

  return (
    <AuthContext.Provider value={value}>
      {children}
      {open && (
        <div className="auth-overlay open" onClick={(event) => event.target === event.currentTarget && closeAuth()}>
          <section className="auth-box" role="dialog" aria-modal="true" aria-labelledby="auth-title">
            <button type="button" className="auth-close" aria-label="ปิด" onClick={closeAuth}>
              ×
            </button>
            {user ? (
              <>
                <div className="auth-mark">
                  ✦ My<span>Munga</span>
                </div>
                <h2 id="auth-title">บัญชีของฉัน</h2>
                <p className="auth-sub">{user.email ?? user.name ?? "สมาชิก MyMunga"}</p>
                <p className="auth-info">
                  <button type="button" className="auth-signout" onClick={() => void signOut()}>
                    ออกจากระบบ
                  </button>
                </p>
              </>
            ) : (
              <>
                <div className="auth-mark">
                  ✦ My<span>Munga</span>
                </div>
                <h2 id="auth-title">
                  {mode === "signup"
                    ? "สร้างบัญชี MyMunga"
                    : mode === "forgot"
                      ? "ตั้งรหัสผ่านใหม่"
                      : mode === "reset"
                        ? "กำหนดรหัสผ่านใหม่"
                        : "ยินดีต้อนรับกลับมา"}
                </h2>
                <p className="auth-sub">
                  {mode === "signup"
                    ? "เริ่มต้นค้นหาเรื่องราวที่คุณชอบ"
                    : mode === "forgot"
                      ? "เราจะส่งวิธีตั้งรหัสผ่านใหม่ไปยังอีเมลของคุณ"
                      : mode === "reset"
                        ? "กรอกรหัสผ่านใหม่ของคุณ"
                        : "เข้าสู่ระบบเพื่อเริ่มต้นอ่านเรื่องโปรด"}
                </p>
                <form className="auth-form" onSubmit={handleSubmit}>
                  {showName && (
                    <label>
                      ชื่อที่แสดง
                      <input name="name" autoComplete="name" maxLength={80} defaultValue="" />
                    </label>
                  )}
                  {mode !== "reset" && (
                    <label>
                      อีเมล
                      <input ref={emailRef} name="email" type="email" autoComplete="email" required />
                    </label>
                  )}
                  {showPassword && (
                    <label>
                      รหัสผ่าน
                      <input
                        name="password"
                        type="password"
                        autoComplete={mode === "signin" ? "current-password" : "new-password"}
                        minLength={8}
                        required
                      />
                    </label>
                  )}
                  <p className={`auth-error${notice ? " success" : ""}`} role="alert">
                    {error || notice}
                  </p>
                  <button className="auth-submit" type="submit" disabled={pending}>
                    {pending
                      ? "กำลังดำเนินการ..."
                      : mode === "signup"
                        ? "สมัครสมาชิก"
                        : mode === "forgot"
                          ? "ส่งอีเมล"
                          : mode === "reset"
                            ? "บันทึกรหัสผ่าน"
                            : "เข้าสู่ระบบ"}
                  </button>
                </form>
                <button
                  type="button"
                  className="auth-switch"
                  onClick={() => {
                    setError("");
                    setNotice("");
                    setMode(mode === "signup" ? "signin" : "signup");
                  }}
                >
                  {mode === "signup" ? "มีบัญชีแล้ว? เข้าสู่ระบบ" : "ยังไม่มีบัญชี? สมัครสมาชิก"}
                </button>
                <button
                  type="button"
                  className="auth-forgot"
                  onClick={() => {
                    setError("");
                    setNotice("");
                    setMode(mode === "forgot" ? "signin" : "forgot");
                  }}
                >
                  {mode === "forgot" ? "กลับไปเข้าสู่ระบบ" : "ลืมรหัสผ่าน?"}
                </button>
                <p className="auth-info">บัญชีสมาชิกดูแลโดย Neon Auth</p>
              </>
            )}
          </section>
        </div>
      )}
    </AuthContext.Provider>
  );
}
