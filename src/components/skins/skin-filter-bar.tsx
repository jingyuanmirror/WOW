'use client';

import { Search, Grid3x3, List, X } from 'lucide-react';
import { SkinVersion, SkinQuality, SortOption } from '@/lib/types/skin';
import { useSkinFilters } from '@/lib/hooks/use-skin-filters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface SkinFilterBarProps {
  availableTags?: string[];
}

export function SkinFilterBar({ availableTags = [] }: SkinFilterBarProps) {
  const {
    filters,
    updateFilter,
    clearFilters,
    toggleVersion,
    toggleTag,
    hasActiveFilters,
  } = useSkinFilters();

  const [searchInput, setSearchInput] = useState(filters.search || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const versions: { key: SkinVersion; label: string }[] = [
    { key: 'retail', label: '正式服' },
    { key: 'classic', label: '60版' },
    { key: 'wrath', label: '80版' },
  ];

  const sortOptions: { key: SortOption; label: string }[] = [
    { key: 'default', label: '默认排序' },
    { key: 'likes', label: '喜欢最多' },
    { key: 'latest', label: '最新优先' },
    { key: 'name-asc', label: '名称 A-Z' },
    { key: 'name-desc', label: '名称 Z-A' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('search', searchInput.trim() || undefined);
  };

  return (
    <div className="sticky top-20 z-10 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 py-4">
      <div className="container mx-auto px-4">
        {/* 主工具栏 */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* 版本筛选 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400 font-medium mr-2">版本:</span>
            {versions.map((version) => (
              <Button
                key={version.key}
                variant={filters.versions?.includes(version.key) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleVersion(version.key)}
                className={
                  filters.versions?.includes(version.key)
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'border-zinc-700 hover:bg-zinc-800'
                }
              >
                {version.label}
              </Button>
            ))}
          </div>

          {/* 排序选择器 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400 font-medium">排序:</span>
            <select
              value={filters.sort || 'likes'}
              onChange={(e) => updateFilter('sort', e.target.value as SortOption)}
              className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {sortOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 搜索与视图切换 */}
          <div className="flex items-center gap-2 flex-1 md:flex-initial md:min-w-[300px]">
            <form onSubmit={handleSearchSubmit} className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                type="text"
                placeholder="搜索皮肤名称..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 pr-10 bg-zinc-900 border-zinc-700 text-zinc-200 placeholder:text-zinc-500"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                    updateFilter('search', undefined);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* 视图切换 */}
            <div className="hidden md:flex items-center gap-1 border border-zinc-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${
                  viewMode === 'grid' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
                title="网格视图"
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${
                  viewMode === 'list' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
                title="列表视图"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 标签筛选 (可选) */}
        {availableTags.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-zinc-400 font-medium">标签:</span>
            {availableTags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  filters.tags?.includes(tag)
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:bg-zinc-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* 激活的筛选条件 */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-zinc-400">已选择:</span>
            
            {filters.versions?.map((version) => (
              <span
                key={version}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs"
              >
                {versions.find((v) => v.key === version)?.label}
                <button
                  onClick={() => toggleVersion(version)}
                  className="hover:text-blue-100"
                >
                  ×
                </button>
              </span>
            ))}

            {filters.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs"
              >
                {tag}
                <button
                  onClick={() => toggleTag(tag)}
                  className="hover:text-amber-100"
                >
                  ×
                </button>
              </span>
            ))}

            {filters.search && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs">
                搜索: "{filters.search}"
                <button
                  onClick={() => {
                    setSearchInput('');
                    updateFilter('search', undefined);
                  }}
                  className="hover:text-purple-100"
                >
                  ×
                </button>
              </span>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs text-zinc-400 hover:text-zinc-200"
            >
              清除全部
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
