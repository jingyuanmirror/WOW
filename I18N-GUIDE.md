# 国际化 (i18n) 实现指南

## 概述

本项目已实现完整的双语支持（中文/英文），使用 Zustand 进行状态管理，支持持久化存储用户语言偏好。

## 核心文件

### 1. 语言状态管理
- **路径**: `src/lib/stores/language-store.ts`
- **功能**: 管理当前语言状态，支持本地持久化
- **使用**: 
  ```tsx
  import { useLanguageStore } from '@/lib/stores/language-store';
  const { locale, setLocale } = useLanguageStore();
  ```

### 2. 翻译字典
- **路径**: `src/lib/i18n/translations.ts`
- **功能**: 包含所有中英文翻译内容
- **支持语言**: `zh-CN` (简体中文), `en-US` (美式英语)

### 3. 翻译 Hook
- **路径**: `src/lib/i18n/use-translation.ts`
- **功能**: 提供翻译函数和当前语言信息
- **使用**:
  ```tsx
  import { useTranslation } from '@/lib/i18n/use-translation';
  const { t, locale } = useTranslation();
  
  // 使用翻译
  <h1>{t('hero.title')}</h1>
  ```

### 4. 语言切换器组件
- **路径**: `src/components/language-switcher.tsx`
- **功能**: 提供语言切换 UI，包含国旗图标和下拉菜单
- **特性**: 
  - 平滑动画效果
  - 显示当前选中语言
  - 支持点击外部关闭

### 5. 语言更新器
- **路径**: `src/components/language-updater.tsx`
- **功能**: 自动更新 HTML lang 属性以匹配当前语言

## 使用方法

### 在组件中使用翻译

```tsx
'use client';

import { useTranslation } from '@/lib/i18n/use-translation';

export function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('nav.brand')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  );
}
```

### 添加新的翻译内容

在 `src/lib/i18n/translations.ts` 中添加:

```typescript
export const translations = {
  'zh-CN': {
    newSection: {
      title: '新标题',
      description: '新描述',
    },
  },
  'en-US': {
    newSection: {
      title: 'New Title',
      description: 'New Description',
    },
  },
};
```

然后在组件中使用:

```tsx
{t('newSection.title')}
{t('newSection.description')}
```

### 切换语言

语言切换器已集成在导航栏中，用户可以通过点击地球图标按钮进行切换。程序会自动:
1. 更新全局语言状态
2. 保存到 localStorage
3. 重新渲染所有使用翻译的组件
4. 更新 HTML lang 属性

## 已翻译的内容

### 导航栏
- 品牌名称
- 菜单项（首页、皮肤列表、关于、社区）
- 登录按钮

### 首页
- Hero 区域（标题、副标题、统计数据）
- 功能特性区域
- 精选皮肤区域
- 页脚

### 通用文本
- 按钮文字
- 表单标签
- 错误消息
- 成功提示

## 技术特性

1. **类型安全**: 使用 TypeScript 确保翻译键的类型安全
2. **性能优化**: 使用 Zustand 进行高效的状态管理
3. **持久化**: 用户语言偏好自动保存到 localStorage
4. **SEO 友好**: 动态更新 HTML lang 属性和 meta 标签
5. **响应式**: 语言切换器在移动端和桌面端均有良好体验

## 注意事项

1. 所有客户端组件需要标记 `'use client'` 才能使用 `useTranslation` hook
2. 添加新翻译时，确保中英文都有对应的翻译
3. 翻译键使用点号分隔的路径格式，如 `'section.subsection.key'`
4. 语言偏好会在页面刷新后保持

## 扩展支持更多语言

要添加新语言（如日语），在 `translations.ts` 中添加:

```typescript
export const translations = {
  'zh-CN': { /* ... */ },
  'en-US': { /* ... */ },
  'ja-JP': {
    nav: {
      brand: 'アゼロスUIスタジオ',
      // ... 其他翻译
    },
  },
} as const;
```

然后在 `language-store.ts` 中更新类型:

```typescript
export type Locale = 'zh-CN' | 'en-US' | 'ja-JP';
```

在 `language-switcher.tsx` 中添加新选项:

```typescript
const languages = [
  { code: 'zh-CN' as Locale, label: '中文', flag: '🇨🇳' },
  { code: 'en-US' as Locale, label: 'English', flag: '🇺🇸' },
  { code: 'ja-JP' as Locale, label: '日本語', flag: '🇯🇵' },
];
```
