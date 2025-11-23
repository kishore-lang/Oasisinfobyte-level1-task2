// src/components/CodingStats.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";

import { Trophy, GitBranch, Target } from "lucide-react";

/* ---------------------------------------------
   Simple fade animation
---------------------------------------------- */
const FadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
});

/* ---------------------------------------------
   Stat Card Component
---------------------------------------------- */
const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
}> = ({ icon, label, value, sub }) => {
  const isNumeric = typeof value === "number";
  const numericValue = isNumeric ? value : Number(value);
  const motionNumber = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState<number>(isNumeric ? 0 : Number(value));

  useMotionValueEvent(motionNumber, "change", (latest) => {
    if (isNumeric) {
      setDisplayValue(Math.round(latest));
    }
  });

  useEffect(() => {
    if (!isNumeric || Number.isNaN(numericValue)) {
      return;
    }

    const controls = animate(motionNumber, numericValue, {
      duration: 1.1,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [isNumeric, motionNumber, numericValue]);

  const renderedValue = isNumeric ? displayValue : value;

  return (
    <motion.div
      {...FadeIn(0)}
      whileHover={{ scale: 1.04, y: -5 }}
      className="glass-effect p-5 rounded-2xl border border-white/10 cursor-default"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold">
            <motion.span
              aria-live={isNumeric ? "polite" : undefined}
              className="inline-block"
            >
              {renderedValue}
            </motion.span>
          </p>
          {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------------------------------------
   Safe JSON fetch
---------------------------------------------- */
async function safeFetchJSON(url: string, opts?: RequestInit) {
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/* ---------------------------------------------
   GitHub Stats Fetcher
---------------------------------------------- */
async function fetchGitHub(username: string) {
  const token = (import.meta as any).env?.VITE_GITHUB_TOKEN;
  const headers = token ? { Authorization: `token ${token}` } : {};

  const profile = await safeFetchJSON(`https://api.github.com/users/${username}`, { headers });
  const repos = await safeFetchJSON(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    { headers }
  );

  const stars = Array.isArray(repos)
    ? repos.reduce((a: number, r: any) => a + (r.stargazers_count || 0), 0)
    : 0;

  return {
    ok: true,
    repos: profile.public_repos ?? 0,
    followers: profile.followers ?? 0,
    stars,
  };
}

/* ---------------------------------------------
   MAIN COMPONENT
---------------------------------------------- */
export const CodingStats: React.FC = () => {
  const githubUser = "kishore-lang";
  const leetcodeUser = "FZr2ONygTE";

  const [github, setGithub] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [leetcodeError, setLeetcodeError] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const leetCardUrl = useMemo(
    () =>
      `https://leetcard.jacoblin.cool/${leetcodeUser}?ext=contest&theme=dark&font=Kanit&animation=true`,
    [leetcodeUser]
  );

  useEffect(() => {
    let active = true;
    setLoading(true);

    (async () => {
      const gh = await fetchGitHub(githubUser).catch(() => ({ ok: false }));

      if (!active) return;

      setGithub(gh);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section ref={ref} className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-center text-4xl font-bold mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          Coding Profile — Live Stats
        </motion.h2>

        <div className="space-y-12">
          {/* ---------------- GITHUB ---------------- */}
          <motion.div {...FadeIn(0.1)} className="glass-effect p-6 rounded-2xl border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">GitHub</h3>
              <a
                href={`https://github.com/${githubUser}`}
                className="text-primary text-sm"
                target="_blank"
              >
                View →
              </a>
            </div>

            {!loading && github?.ok && (
              <div className="grid sm:grid-cols-3 gap-4">
                <StatCard label="Repositories" value={github.repos} icon={<GitBranch />} />
                <StatCard label="Stars" value={github.stars} icon={<Trophy />} />
                <StatCard label="Followers" value={github.followers} icon={<Target />} />
              </div>
            )}

            {!loading && !github?.ok && (
              <p className="text-muted-foreground text-sm">GitHub stats unavailable.</p>
            )}
          </motion.div>

          {/* ---------------- LEETCODE ---------------- */}
          <motion.div {...FadeIn(0.15)} className="glass-effect p-6 rounded-2xl border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">LeetCode</h3>
              <a
                href={`https://leetcode.com/u/${leetcodeUser}`}
                className="text-primary text-sm"
                target="_blank"
              >
                View →
              </a>
            </div>

            <div className="flex flex-col items-center gap-4">
              {!leetcodeError ? (
                <motion.div
                  className="group relative w-full max-w-xl rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background/40 to-secondary/10 shadow-[0_0_40px_rgba(0,255,200,0.25)] overflow-hidden"
                  whileHover={{
                    scale: 1.03,
                    rotateX: -4,
                    rotateY: 4,
                    boxShadow: "0 25px 60px rgba(0,255,200,0.35)",
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  style={{ transformStyle: "preserve-3d", perspective: 900 }}
                >
                  {/* soft holo highlight */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_55%)]" />

                  {/* angled holographic streak */}
                  <div className="pointer-events-none absolute -inset-x-10 -top-10 h-24 bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-40 group-hover:opacity-70 blur-md rotate-3 transition-opacity duration-500" />

                  {/* caption bar over image bottom */}
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 px-4 pb-3 pt-6 bg-gradient-to-t from-background/70 via-background/10 to-transparent backdrop-blur-sm flex items-center justify-between text-[11px] sm:text-xs text-muted-foreground">
                    <span className="uppercase tracking-wide text-primary/80 font-semibold">LeetCode live stats</span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground/80">Badge updates as your solves grow</span>
                  </div>

                  <img
                    src={leetCardUrl}
                    alt="LeetCode solved stats"
                    className="relative w-full rounded-xl"
                    loading="lazy"
                    onError={() => setLeetcodeError(true)}
                  />
                </motion.div>
              ) : (
                <div className="w-full max-w-xl rounded-xl border border-white/10 bg-background/60 p-6 text-center">
                  <p className="text-lg font-semibold text-primary mb-2">LeetCode stats unavailable</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    The third-party badge could not load right now. You can still view the latest progress directly on LeetCode.
                  </p>
                  <a
                    href={`https://leetcode.com/u/${leetcodeUser}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm"
                  >
                    Open LeetCode Profile
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CodingStats;
