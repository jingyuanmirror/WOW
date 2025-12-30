# 活动轮播功能使用指南

## 概述

已在首页顶部添加了一个专业的活动宣传轮播组件，可以展示大图宣传最新活动、特惠信息或重要公告。

## 功能特性

- ✅ **自动轮播**：默认每5秒自动切换到下一张
- ✅ **响应式设计**：适配桌面端和移动端
- ✅ **手动控制**：支持左右箭头按钮和底部圆点导航
- ✅ **暂停功能**：鼠标悬停时自动暂停轮播
- ✅ **平滑过渡**：优雅的淡入淡出动画效果
- ✅ **自定义链接**：每张轮播图可设置独立的跳转链接
- ✅ **背景渐变**：左侧渐变遮罩确保文字清晰可读
- ✅ **计数器显示**：左上角显示当前页码
- ✅ **自动播放指示器**：右上角显示自动播放状态

## 文件位置

- **组件文件**: `src/components/promo-carousel.tsx`
- **数据配置**: `src/lib/data.ts` (导出 `promoSlides`)
- **使用位置**: `src/app/page.tsx`

## 如何修改轮播内容

### 1. 编辑数据配置

打开 `src/lib/data.ts`，找到 `promoSlides` 数组：

```typescript
export const promoSlides = [
  {
    id: 1,
    title: "新年特惠活动",
    description: "全场界面皮肤限时7折优惠，新年新气象，给你的游戏界面换个新装！",
    image: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=1920&h=600&fit=crop",
    link: "/skins",
    linkText: "立即选购",
    backgroundColor: "#1a0a2e"
  },
  // 添加更多轮播项...
];
```

### 2. 轮播项配置说明

每个轮播项支持以下属性：

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | `string \| number` | ✅ | 唯一标识符 |
| `title` | `string` | ✅ | 主标题（大字） |
| `description` | `string` | ❌ | 描述文字 |
| `image` | `string` | ✅ | 背景图片URL |
| `link` | `string` | ❌ | 点击按钮跳转的链接 |
| `linkText` | `string` | ❌ | 按钮文字（默认："了解更多"） |
| `backgroundColor` | `string` | ❌ | 背景色（作为图片加载前的占位） |

### 3. 添加本地图片

如果要使用本地图片而不是外部URL：

1. 将图片放到 `public/promo/` 目录下
2. 在配置中使用相对路径：

```typescript
{
  id: 1,
  title: "我的活动",
  image: "/promo/my-event-banner.jpg",
  // ...其他配置
}
```

### 4. 自定义轮播高度

在 `src/app/page.tsx` 中修改 `height` 属性：

```typescript
<PromoCarousel 
  slides={promoSlides} 
  height="600px"  // 修改这里，可以是 "500px", "80vh" 等
/>
```

### 5. 自定义自动播放间隔

```typescript
<PromoCarousel 
  slides={promoSlides} 
  autoPlayInterval={5000}  // 毫秒，默认5000（5秒）
  height="600px"
/>
```

## 图片建议

- **推荐尺寸**: 1920×600px 或更大
- **格式**: JPG, PNG, WebP
- **文件大小**: 建议小于 500KB（优化加载速度）
- **比例**: 16:5 或 3:1 左右
- **内容**: 重要内容放在左侧，因为右侧可能被渐变遮罩覆盖

## 示例：添加新的轮播项

```typescript
export const promoSlides = [
  // ...现有的轮播项
  {
    id: 4,
    title: "春节限定皮肤上架",
    description: "中国风传统元素设计，独家限量发售",
    image: "/promo/spring-festival-2025.jpg",
    link: "/skins?category=limited",
    linkText: "查看限定皮肤",
    backgroundColor: "#8B0000"
  }
];
```

## 移除轮播功能

如果暂时不需要轮播，可以在 `src/app/page.tsx` 中注释掉或删除这一行：

```typescript
// <PromoCarousel slides={promoSlides} height="600px" />
```

## 技术细节

- 使用 Next.js `Image` 组件优化图片加载
- 支持触摸滑动（移动端）
- 键盘导航支持（左右箭头键）
- 自动暂停功能（鼠标悬停时）
- 响应式设计（移动端和桌面端自适应）

## 常见问题

**Q: 轮播图片显示不出来？**
A: 检查图片URL是否正确，如果是外部链接，确保在 `next.config.ts` 中配置了对应的域名。

**Q: 如何只显示一张图片而不轮播？**
A: 在 `promoSlides` 中只保留一个对象即可，组件会自动隐藏导航控件。

**Q: 可以添加视频吗？**
A: 当前版本支持图片，如需视频背景，需要自定义组件代码。

## 联系支持

如有问题或需要定制功能，请联系开发团队。
