# 魔兽世界UI皮肤品牌官网

一个专业的魔兽世界UI皮肤设计师品牌展示与销售平台。

## 🎯 项目概述

这是一个为魔兽世界UI皮肤设计师打造的现代化品牌官网，集展示、销售、文档于一体。采用最新的Next.js 16技术栈，提供流畅的用户体验和专业的视觉呈现。

## ✨ 核心功能

### 已实现功能 (MVP)

#### 1. 首页 (Home Page)
- **英雄区 (Hero Section)**
  - 引人注目的品牌展示
  - 核心数据展示（下载量、评分、作品数量等）
  - 主要CTA按钮引导用户行动

- **精选作品展示 (Featured Skins)**
  - 展示4款最受欢迎的UI皮肤
  - 每款皮肤包含：
    - 品质等级标签（传说、史诗、精良等）
    - 限时优惠标识
    - 评分和下载数据
    - 标签分类
    - 价格信息
  - 悬停效果增强交互体验

- **核心特性展示 (Features)**
  - 6大核心优势
  - 图标+文字说明
  - 专业品质保证

- **设计师介绍 (About Designer)**
  - 个人简介和设计理念
  - 成就展示
  - 社交媒体链接
  - 评分展示

- **安装指南 (Installation Guide)**
  - 3步快速入门教程
  - 可视化流程展示
  - 引导至详细文档

- **用户评价 (Testimonials)**
  - 真实用户反馈
  - 5星评分展示
  - 增强信任感

- **行动号召区 (CTA Section)**
  - 醒目的最终转化区
  - 双CTA按钮（浏览作品/联系设计师）

- **页脚 (Footer)**
  - 完整站点导航
  - 社交媒体链接
  - 版权信息

### 待开发功能

#### Phase 2 - 作品集与详情页
- [ ] 作品集列表页 (`/skins`)
  - 筛选功能（按分类、价格、时间）
  - 搜索功能
  - 排序选项
  - 分页/无限滚动

- [ ] 皮肤详情页 (`/skins/[id]`)
  - 高清图片画廊
  - 演示视频
  - 详细功能介绍
  - 用户评论区
  - 相关推荐

#### Phase 3 - 电商功能
- [ ] 购物车系统 (`/cart`)
- [ ] 结算流程 (`/checkout`)
- [ ] 支付集成（Stripe、支付宝、微信）
- [ ] 用户账户系统 (`/account`)
  - 注册/登录
  - 订单历史
  - 下载管理
- [ ] 数字产品交付系统

#### Phase 4 - 文档与社区
- [ ] 使用文档 (`/docs`)
  - 安装指南
  - 自定义教程
  - 故障排除
  - FAQ
- [ ] 社区功能
  - 评论系统
  - 用户展示墙
  - 社交分享

#### Phase 5 - 后台管理
- [ ] 内容管理系统 (CMS)
- [ ] 订单管理
- [ ] 用户管理
- [ ] 数据分析仪表板

## 🛠 技术栈

- **框架**: Next.js 16 (App Router)
- **UI库**: 
  - React 19
  - Tailwind CSS 4
  - shadcn/ui
  - Lucide React Icons
- **语言**: TypeScript 5
- **部署**: Vercel (推荐)
- **未来集成**: 
  - Supabase (数据库 + 认证)
  - Stripe (支付)
  - Vercel AI SDK (AI客服)

## 📂 项目结构

```
/Users/jingyuan/src_code/WOW/
├── src/
│   ├── app/
│   │   ├── page.tsx          # 首页
│   │   ├── layout.tsx        # 根布局
│   │   └── globals.css       # 全局样式
│   ├── components/
│   │   └── ui/               # shadcn/ui 组件
│   │       ├── button.tsx
│   │       └── card.tsx
│   └── lib/
│       ├── data.ts           # 模拟数据
│       └── utils.ts          # 工具函数
├── public/                   # 静态资源
├── PRD.md                    # 产品需求文档
└── README-PROJECT.md         # 本文档
```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
pnpm build
pnpm start
```

## 🎨 设计系统

### 配色方案

基于魔兽世界的物品品质色彩体系：

- **主色**: 
  - 金色 `#FFD700` - 品牌主色，按钮、强调元素
  - 琥珀色 `#FFA500` - 渐变辅助色

- **背景色**:
  - 极深灰 `#0a0a0a` (zinc-950)
  - 深灰 `#18181b` (zinc-900)
  - 中灰 `#27272a` (zinc-800)

- **品质等级色**:
  - 传说 (Legendary): `#FF8000` (橙色)
  - 史诗 (Epic): `#A335EE` (紫色)
  - 精良 (Rare): `#0070DD` (蓝色)
  - 优秀 (Uncommon): `#1EFF00` (绿色)
  - 普通 (Common): `#9D9D9D` (灰色)

### 字体

- 标题: 系统默认字体栈 (Inter/思源黑体)
- 正文: 同上
- 代码: Monospace

### 组件

使用 shadcn/ui 组件库：
- Button - 自定义渐变按钮
- Card - 产品卡片、功能卡片
- 更多组件按需添加

## 📝 数据管理

当前使用 `src/lib/data.ts` 中的模拟数据：

### 数据结构

```typescript
// 皮肤数据
interface Skin {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  quality: 'legendary' | 'epic' | 'rare' | 'uncommon';
  image: string;
  featured: boolean;
  downloads: number;
  rating: number;
  tags: string[];
  features: string[];
  // ...
}

// 设计师数据
interface Designer {
  name: string;
  bio: string;
  stats: {...};
  social: {...};
  achievements: string[];
}

// 用户评价
interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  skin: string;
  date: string;
}
```

### 未来数据库集成

计划使用 Supabase PostgreSQL，表结构设计：

- `skins` - 皮肤产品
- `users` - 用户信息
- `orders` - 订单记录
- `reviews` - 用户评论
- `downloads` - 下载记录

## 🔧 配置说明

### Tailwind CSS

配置文件: `tailwind.config.js` (由Next.js自动管理)

使用 Tailwind CSS 4.0 的新特性：
- CSS变量支持
- 改进的渐变语法
- 更好的暗色模式支持

### Next.js

配置文件: `next.config.ts`

关键配置：
- App Router模式
- Turbopack (开发模式)
- 图片优化

## 📊 性能优化

已实现：
- ✅ Next.js Image组件优化（图片占位符）
- ✅ 组件级代码分割
- ✅ Tailwind CSS优化（仅打包使用的类）
- ✅ 暗色主题优化（减少重绘）

待实现：
- [ ] 图片懒加载
- [ ] 视频懒加载
- [ ] CDN集成
- [ ] 缓存策略

## 🧪 测试

待添加：
- [ ] 单元测试 (Jest + React Testing Library)
- [ ] E2E测试 (Playwright)
- [ ] 性能测试 (Lighthouse CI)

## 📦 部署

### Vercel (推荐)

1. 推送代码到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署

### 其他平台

支持所有支持 Next.js 的平台：
- Netlify
- AWS Amplify
- Railway
- 自建服务器 (Node.js环境)

## 🗺 开发路线图

### v1.0 (当前 - MVP)
- [x] 首页设计与实现
- [x] 核心组件开发
- [x] 响应式布局
- [x] PRD文档

### v1.1 (下一步)
- [ ] 作品集列表页
- [ ] 皮肤详情页
- [ ] 搜索和筛选功能

### v2.0 (电商功能)
- [ ] 购物车系统
- [ ] 支付集成
- [ ] 用户账户
- [ ] 订单管理

### v3.0 (社区与内容)
- [ ] 用户评论系统
- [ ] 文档中心
- [ ] 社区功能
- [ ] 博客/更新日志

### v4.0 (高级功能)
- [ ] 后台管理系统
- [ ] 数据分析
- [ ] AI客服
- [ ] 多语言支持

## 📄 相关文档

- [产品需求文档 (PRD)](./PRD.md) - 完整的产品规划和功能说明
- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [shadcn/ui 文档](https://ui.shadcn.com)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📝 许可证

Apache 2.0

---

**创建日期**: 2025-12-24
**当前版本**: v1.0 (MVP)
**维护者**: WOW UI Skin Designer
