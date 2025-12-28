import { Skin, SkinFilterParams, SkinVersion, SkinQuality } from '../types/skin';

/**
 * 将现有数据格式转换为新的 Skin 格式
 */
export function transformLegacySkin(skin: any): Skin {
  // 根据 category 推断版本支持
  const versions: SkinVersion[] = ['retail'];
  
  // 根据 tags 添加经典版支持
  if (skin.tags?.some((tag: string) => tag.includes('经典') || tag.includes('怀旧'))) {
    versions.push('classic');
  }
  
  return {
    ...skin,
    id: skin.id.toString(),
    versions,
    stats: {
      likes: Math.floor(skin.downloads / 10), // 模拟喜欢数
      views: skin.downloads * 2,
      downloads: skin.downloads,
      comments: skin.reviews,
    },
    media: {
      thumbnail: skin.image,
      images: [
        {
          url: skin.image,
          width: 1920,
          height: 1080,
        },
      ],
      videos: skin.video ? [
        {
          url: skin.video,
          thumbnail: skin.image,
          duration: 30,
        },
      ] : undefined,
    },
    author: {
      id: 'designer-1',
      name: '艾泽拉斯UI大师',
    },
    createdAt: new Date(skin.lastUpdate || '2025-12-01').toISOString(),
    updatedAt: new Date(skin.lastUpdate || '2025-12-01').toISOString(),
  };
}

/**
 * 过滤皮肤列表
 */
export function filterSkins(skins: Skin[], filters: SkinFilterParams): Skin[] {
  let filtered = [...skins];

  // 版本筛选 (OR 关系)
  if (filters.versions && filters.versions.length > 0) {
    filtered = filtered.filter((skin) =>
      filters.versions!.some((version) => skin.versions.includes(version))
    );
  }

  // 标签筛选 (AND 关系)
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter((skin) =>
      filters.tags!.every((tag) => skin.tags.includes(tag))
    );
  }

  // 品质筛选
  if (filters.quality && filters.quality.length > 0) {
    filtered = filtered.filter((skin) =>
      filters.quality!.includes(skin.quality)
    );
  }

  // 搜索关键词
  if (filters.search && filters.search.trim()) {
    const searchLower = filters.search.toLowerCase().trim();
    filtered = filtered.filter((skin) =>
      skin.name.toLowerCase().includes(searchLower) ||
      skin.nameEn?.toLowerCase().includes(searchLower) ||
      skin.description.toLowerCase().includes(searchLower) ||
      skin.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  }

  return filtered;
}

/**
 * 排序皮肤列表
 */
export function sortSkins(skins: Skin[], sortOption: SkinFilterParams['sort'] = 'likes'): Skin[] {
  const sorted = [...skins];

  switch (sortOption) {
    case 'latest':
      return sorted.sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.lastUpdate || 0).getTime();
        const dateB = new Date(b.updatedAt || b.lastUpdate || 0).getTime();
        return dateB - dateA;
      });

    case 'likes':
      return sorted.sort((a, b) => {
        const likesA = a.stats?.likes || a.downloads || 0;
        const likesB = b.stats?.likes || b.downloads || 0;
        return likesB - likesA;
      });

    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));

    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name, 'zh-CN'));

    case 'default':
    default:
      // 综合排序：featured > sortOrder > likes
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        
        const orderA = a.sortOrder || 0;
        const orderB = b.sortOrder || 0;
        if (orderA !== orderB) return orderB - orderA;
        
        const likesA = a.stats?.likes || a.downloads || 0;
        const likesB = b.stats?.likes || b.downloads || 0;
        return likesB - likesA;
      });
  }
}

/**
 * 分页
 */
export function paginateSkins(skins: Skin[], page: number = 1, pageSize: number = 24): Skin[] {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return skins.slice(startIndex, endIndex);
}

/**
 * 获取所有可用标签
 */
export function getAllTags(skins: Skin[]): string[] {
  const tagSet = new Set<string>();
  skins.forEach((skin) => {
    skin.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b, 'zh-CN'));
}

/**
 * 获取品质颜色
 */
export function getQualityColor(quality: SkinQuality): string {
  const colors = {
    common: '#FFFFFF',
    rare: '#0070DD',
    epic: '#A335EE',
    legendary: '#FF8000',
  };
  return colors[quality];
}

/**
 * 获取品质文本颜色类
 */
export function getQualityTextClass(quality: SkinQuality): string {
  const classes = {
    common: 'text-white',
    rare: 'text-blue-400',
    epic: 'text-purple-400',
    legendary: 'text-orange-400',
  };
  return classes[quality];
}

/**
 * 获取版本标签颜色
 */
export function getVersionColor(version: SkinVersion): string {
  const colors = {
    retail: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    classic: 'bg-green-500/20 text-green-300 border-green-500/30',
    wrath: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  };
  return colors[version];
}

/**
 * 格式化数字 (1234 -> 1.2k)
 */
export function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

/**
 * 格式化相对时间
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '1天前';
  if (diffDays < 30) return `${diffDays}天前`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}个月前`;
  return `${Math.floor(diffDays / 365)}年前`;
}
