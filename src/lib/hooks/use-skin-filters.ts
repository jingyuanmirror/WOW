'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SkinFilterParams, SkinVersion, SkinQuality, SortOption } from '../types/skin';

export function useSkinFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 解析当前筛选参数
  const filters: SkinFilterParams = {
    versions: searchParams.get('versions')?.split(',') as SkinVersion[] || undefined,
    tags: searchParams.get('tags')?.split(',') || undefined,
    quality: searchParams.get('quality')?.split(',') as SkinQuality[] || undefined,
    search: searchParams.get('search') || undefined,
    sort: (searchParams.get('sort') as SortOption) || 'likes',
    page: parseInt(searchParams.get('page') || '1'),
    pageSize: parseInt(searchParams.get('pageSize') || '24'),
  };

  // 更新单个筛选条件
  const updateFilter = useCallback((key: keyof SkinFilterParams, value: any) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && (Array.isArray(value) ? value.length > 0 : true)) {
      params.set(key, Array.isArray(value) ? value.join(',') : value.toString());
    } else {
      params.delete(key);
    }

    // 筛选条件变化时重置页码
    if (key !== 'page') {
      params.set('page', '1');
    }

    router.push(`/skins?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  // 批量更新筛选条件
  const updateFilters = useCallback((newFilters: Partial<SkinFilterParams>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && (Array.isArray(value) ? value.length > 0 : true)) {
        params.set(key, Array.isArray(value) ? value.join(',') : value.toString());
      } else {
        params.delete(key);
      }
    });

    // 重置页码
    params.set('page', '1');

    router.push(`/skins?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  // 清除所有筛选
  const clearFilters = useCallback(() => {
    router.push('/skins', { scroll: false });
  }, [router]);

  // 切换版本筛选
  const toggleVersion = useCallback((version: SkinVersion) => {
    const currentVersions = filters.versions || [];
    const newVersions = currentVersions.includes(version)
      ? currentVersions.filter((v) => v !== version)
      : [...currentVersions, version];
    updateFilter('versions', newVersions.length > 0 ? newVersions : undefined);
  }, [filters.versions, updateFilter]);

  // 切换标签筛选
  const toggleTag = useCallback((tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
    updateFilter('tags', newTags.length > 0 ? newTags : undefined);
  }, [filters.tags, updateFilter]);

  // 切换品质筛选
  const toggleQuality = useCallback((quality: SkinQuality) => {
    const currentQuality = filters.quality || [];
    const newQuality = currentQuality.includes(quality)
      ? currentQuality.filter((q) => q !== quality)
      : [...currentQuality, quality];
    updateFilter('quality', newQuality.length > 0 ? newQuality : undefined);
  }, [filters.quality, updateFilter]);

  // 检查是否有激活的筛选
  const hasActiveFilters = Boolean(
    filters.versions?.length ||
    filters.tags?.length ||
    filters.quality?.length ||
    filters.search
  );

  return {
    filters,
    updateFilter,
    updateFilters,
    clearFilters,
    toggleVersion,
    toggleTag,
    toggleQuality,
    hasActiveFilters,
  };
}
