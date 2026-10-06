import type { Lang } from '../i18n/ui';

type Localized = Record<Lang, string>;

// ===== 个人信息：改这里就能更新整个站点 =====
export const profile = {
  name: 'LenoraL',
  githubUser: 'Luxuruce',
  avatar: 'https://avatars.githubusercontent.com/u/74332053?v=4',
  role: {
    zh: '开发者 · AI Agent · 前端',
    en: 'Developer · AI Agents · Front-end',
  } satisfies Localized,
  bio: {
    zh: '我喜欢把想法快速做成可交互的原型。（占位简介，待替换）',
    en: 'I like turning ideas into interactive prototypes, fast. (Placeholder bio)',
  } satisfies Localized,
  about: {
    zh: [
      '这里写两三段自我介绍：你在做什么、擅长什么、最近对什么感兴趣。（占位文字）',
    ],
    en: [
      "A couple of short paragraphs about what you do, what you're good at, and what you're exploring lately. (Placeholder)",
    ],
  } satisfies Record<Lang, string[]>,
  links: [
    { label: { zh: 'GitHub', en: 'GitHub' }, href: 'https://github.com/Luxuruce' },
    { label: { zh: '邮箱', en: 'Email' }, href: 'mailto:hello@example.com' }, // TODO: 换成真实邮箱
  ] satisfies { label: Localized; href: string }[],
};

// ===== 项目展示配置 =====
// 仓库列表在构建时从 GitHub API 自动拉取（公开、非 fork）。
// 这里可以排除某些仓库，或覆盖描述 / 标签（比如补英文描述）。
export const projectConfig = {
  exclude: ['Luxuruce.github.io'],
  /** 置顶顺序，未列出的按 star 数和更新时间排在后面 */
  pinned: ['ai-smart-tourism-demo', 'priceRelatAgent', 'kernelPlia'],
  overrides: {
    'ai-smart-tourism-demo': {
      description: {
        zh: '青石古镇 · 景区口碑与体验 MVP 可交互前端原型（uni-app 游客端 + Vue 3 后台）',
        en: 'Interactive MVP prototype for scenic-area reviews & visitor experience (uni-app client + Vue 3 admin)',
      },
      tags: ['Vue 3', 'uni-app'],
    },
    priceRelatAgent: { tags: ['Python', 'Agent'] },
  } as Record<string, { description?: Localized; tags?: string[] }>,
};
