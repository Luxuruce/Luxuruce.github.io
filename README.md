# Luxuruce.github.io

LenoraL 的个人主页，基于 [Astro](https://astro.build)，中英双语，部署在 GitHub Pages。

## 本地开发

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 输出到 dist/
```

## 修改内容

| 想改什么 | 改哪里 |
|---|---|
| 名字、简介、联系方式 | `src/data/profile.ts` 中的 `profile` |
| 展示哪些仓库、仓库描述 | `src/data/profile.ts` 中的 `projectConfig` |
| 界面文案（按钮、标题） | `src/i18n/ui.ts` |
| 写文章 | 在 `src/content/posts/zh/` 和 `src/content/posts/en/` 下添加同名 `.md` 文件 |

仓库列表在构建时从 GitHub API 拉取；拉取失败时使用 `src/data/repos.fallback.json`。

## 部署

推送到 `main` 后由 `.github/workflows/deploy.yml` 自动构建发布。首次使用需在仓库
**Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。
