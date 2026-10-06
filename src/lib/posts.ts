import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type Post = CollectionEntry<'posts'>;

/** 文章 id 形如 "zh/hello-homepage"，slug 为去掉语言前缀的部分 */
export const postSlug = (post: Post) => post.id.split('/').slice(1).join('/');

export async function getPosts(lang: Lang) {
  const posts = await getCollection(
    'posts',
    (p) => p.id.startsWith(`${lang}/`) && (import.meta.env.DEV || !p.data.draft),
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** 生成某个语言的文章页静态路径，并附上另一语言同名文章是否存在 */
export async function postStaticPaths(lang: Lang) {
  const other: Lang = lang === 'zh' ? 'en' : 'zh';
  const otherSlugs = new Set((await getPosts(other)).map(postSlug));
  return (await getPosts(lang)).map((post) => ({
    params: { slug: postSlug(post) },
    props: { post, hasTranslation: otherSlugs.has(postSlug(post)) },
  }));
}
