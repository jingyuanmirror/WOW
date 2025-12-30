import { Suspense } from 'react';
import type { Metadata } from 'next';
import { skins as legacySkins } from '@/lib/data';
import { transformLegacySkin, filterSkins, sortSkins, getAllTags } from '@/lib/utils/skin-filters';
import { SkinFilterParams } from '@/lib/types/skin';
import { SkinListHeader } from '@/components/skins/skin-list-header';
import { SkinFilterBar } from '@/components/skins/skin-filter-bar';
import { SkinGrid } from '@/components/skins/skin-grid';
import { SkinGridSkeleton } from '@/components/skins/skin-grid-skeleton';
import { SkinResultsSummary } from '@/components/skins/skin-results-summary';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
  title: '皮肤作品集 | WOW UI Skin Designer',
  description: '探索专为魔兽世界打造的精美UI皮肤，提升你的游戏体验。支持正式服、60版、80版。',
};

interface SkinsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function parseSearchParams(searchParams: { [key: string]: string | string[] | undefined }): SkinFilterParams {
  return {
    versions: searchParams.versions
      ? (searchParams.versions as string).split(',') as any
      : undefined,
    tags: searchParams.tags
      ? (searchParams.tags as string).split(',')
      : undefined,
    quality: searchParams.quality
      ? (searchParams.quality as string).split(',') as any
      : undefined,
    search: searchParams.search as string | undefined,
    sort: (searchParams.sort as any) || 'likes',
    page: parseInt((searchParams.page as string) || '1'),
    pageSize: parseInt((searchParams.pageSize as string) || '24'),
  };
}

async function getSkinsData(filters: SkinFilterParams) {
  // 转换现有数据为新格式
  const transformedSkins = legacySkins.map(transformLegacySkin);
  
  // 应用筛选
  let filtered = filterSkins(transformedSkins, filters);
  
  // 应用排序
  filtered = sortSkins(filtered, filters.sort);
  
  // 暂不分页，展示所有结果
  // const paginated = paginateSkins(filtered, filters.page, filters.pageSize);
  
  return {
    skins: filtered,
    total: filtered.length,
    totalSkins: transformedSkins.length,
    allTags: getAllTags(transformedSkins),
  };
}

export default async function SkinsPage({ searchParams }: SkinsPageProps) {
  const params = await searchParams;
  const filters = parseSearchParams(params);
  const { skins, total, totalSkins, allTags } = await getSkinsData(filters);

  return (
    <>
      {/* 顶部导航栏 */}
      <Navbar />
      
      <main className="min-h-screen bg-zinc-950 pt-20">
        {/* 页面头部 */}
        <SkinListHeader total={totalSkins} />

        {/* 筛选工具栏 */}
        <Suspense fallback={<div className="h-20 bg-zinc-950" />}>
          <SkinFilterBar availableTags={allTags} />
        </Suspense>

        {/* 主内容区 */}
        <div className="container mx-auto px-4 py-8">
          <SkinResultsSummary total={total} totalSkins={totalSkins} />

          {/* 皮肤网格 */}
          <Suspense fallback={<SkinGridSkeleton />}>
            <SkinGrid skins={skins} />
          </Suspense>
        </div>
      </main>
    </>
  );
}

// 生成静态参数（可选）
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1小时重新验证
