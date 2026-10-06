import fallback from '../data/repos.fallback.json';
import { profile, projectConfig } from '../data/profile';
import type { Lang } from '../i18n/ui';

interface ApiRepo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  topics?: string[];
  fork: boolean;
  archived: boolean;
}

export interface Project {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  updatedAt: Date;
  tags: string[];
}

let cache: Promise<ApiRepo[]> | undefined;

/** 构建时拉取一次公开仓库；拉取失败（无网络 / 限流）时使用 repos.fallback.json */
function fetchRepos(): Promise<ApiRepo[]> {
  cache ??= (async () => {
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
    const token = process.env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;
    try {
      const res = await fetch(
        `https://api.github.com/users/${profile.githubUser}/repos?per_page=100&sort=pushed&type=owner`,
        { headers },
      );
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      return (await res.json()) as ApiRepo[];
    } catch (err) {
      console.warn(`[github] ${(err as Error).message}, using repos.fallback.json`);
      return fallback as ApiRepo[];
    }
  })();
  return cache;
}

export async function getProjects(lang: Lang): Promise<Project[]> {
  const repos = (await fetchRepos()).filter(
    (r) => !r.fork && !r.archived && !projectConfig.exclude.includes(r.name),
  );
  const rank = (name: string) => {
    const i = projectConfig.pinned.indexOf(name);
    return i === -1 ? Infinity : i;
  };
  repos.sort(
    (a, b) =>
      rank(a.name) - rank(b.name) ||
      b.stargazers_count - a.stargazers_count ||
      Date.parse(b.pushed_at) - Date.parse(a.pushed_at),
  );
  return repos.map((r) => {
    const o = projectConfig.overrides[r.name];
    return {
      name: r.name,
      url: r.html_url,
      description: o?.description?.[lang] ?? r.description,
      language: r.language,
      stars: r.stargazers_count,
      updatedAt: new Date(r.pushed_at),
      tags: o?.tags ?? (r.topics?.length ? r.topics : r.language ? [r.language] : []),
    };
  });
}
