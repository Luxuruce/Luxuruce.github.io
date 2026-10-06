export const languages = { zh: '中文', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'zh';

export const ui = {
  zh: {
    'nav.about': '关于',
    'nav.projects': '项目',
    'nav.writing': '文章',
    'projects.noDescription': '暂无描述',
    'projects.viewAll': '查看全部仓库',
    'writing.empty': '还没有文章。',
    'post.back': '返回首页',
    'lang.switch': 'EN',
    'notFound.title': '页面不存在',
    'notFound.back': '回到首页',
    'a11y.skip': '跳到正文',
    'a11y.sectionNav': '页面导航',
    'a11y.social': '社交链接',
    'projects.stars': '星标',
    'lang.label': 'Switch to English',
  },
  en: {
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.writing': 'Writing',
    'projects.noDescription': 'No description yet',
    'projects.viewAll': 'View all repositories',
    'writing.empty': 'No posts yet.',
    'post.back': 'Back home',
    'lang.switch': '中文',
    'notFound.title': 'Page not found',
    'notFound.back': 'Back home',
    'a11y.skip': 'Skip to content',
    'a11y.sectionNav': 'Sections',
    'a11y.social': 'Social links',
    'projects.stars': 'stars',
    'lang.label': '切换到中文',
  },
} as const;

export type UiKey = keyof (typeof ui)['zh'];

export function useTranslations(lang: Lang) {
  return (key: UiKey) => ui[lang][key];
}

/** 给站内路径加上语言前缀：中文无前缀，英文为 /en */
export function localePath(lang: Lang, path = '/') {
  const p = path.startsWith('/') ? path : `/${path}`;
  return lang === defaultLang ? p : `/${lang}${p === '/' ? '/' : p}`;
}

export function otherLang(lang: Lang): Lang {
  return lang === 'zh' ? 'en' : 'zh';
}

export function formatDate(date: Date, lang: Lang) {
  return date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: lang === 'zh' ? '2-digit' : 'short',
    day: '2-digit',
  });
}
