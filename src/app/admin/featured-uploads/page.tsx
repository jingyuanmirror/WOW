"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  BadgeInfo,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Eye,
  Filter,
  LayoutGrid,
  LayoutList,
  Loader2,
  Minus,
  PenLine,
  Plus,
  Search,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Status = "draft" | "published" | "offline" | "deleted";
type Quality = "common" | "rare" | "epic" | "legendary";
type PriceType = "paid" | "free";

type FeaturedItem = {
  id: string;
  title: string;
  description: string;
  quality: Quality;
  tags: string[];
  priceType: PriceType;
  price?: number;
  mainImage: string;
  backupImages: string[];
  sortOrder: number;
  status: Status;
  publishAt?: string;
  updatedAt: string;
};

type Draft = Omit<FeaturedItem, "id" | "updatedAt"> & { id?: string };

const qualityMap: Record<Quality, { label: string; className: string }> = {
  common: { label: "优秀", className: "bg-green-500/80" },
  rare: { label: "精良", className: "bg-blue-500/80" },
  epic: { label: "史诗", className: "bg-purple-500/80" },
  legendary: { label: "传说", className: "bg-orange-500/80" },
};

const statusLabel: Record<Status, string> = {
  draft: "草稿",
  published: "已发布",
  offline: "已下线",
  deleted: "已删除",
};

const tagOptions = ["最新", "热门", "免费", "PvP", "PvE"];

const initialData: FeaturedItem[] = [
  {
    id: "f-1",
    title: "暗影之刃 UI",
    description: "暗黑风格的PvP专用UI，突出冷却与敌方施法条。",
    quality: "epic",
    tags: ["热门", "PvP"],
    priceType: "paid",
    price: 29.99,
    mainImage: "/skins/shadow-blade.jpg",
    backupImages: [],
    sortOrder: 95,
    status: "published",
    publishAt: "2025-12-15T10:00",
    updatedAt: "2025-12-20T08:00",
  },
  {
    id: "f-2",
    title: "圣光守护者",
    description: "治疗向高亮提示与团队框架，提供史诗品质体验。",
    quality: "legendary",
    tags: ["最新", "PvE"],
    priceType: "paid",
    price: 34.99,
    mainImage: "/skins/holy-guardian.jpg",
    backupImages: ["/skins/holy-guardian-2.jpg"],
    sortOrder: 98,
    status: "published",
    publishAt: "2025-12-22T09:00",
    updatedAt: "2025-12-23T09:30",
  },
  {
    id: "f-3",
    title: "竞技场大师",
    description: "竞技场冷却、DR追踪和敌方技能提示，侧重竞争力。",
    quality: "legendary",
    tags: ["热门", "PvP"],
    priceType: "paid",
    price: 39.99,
    mainImage: "/skins/arena-master.jpg",
    backupImages: [],
    sortOrder: 97,
    status: "published",
    publishAt: "2025-12-18T12:00",
    updatedAt: "2025-12-21T14:00",
  },
  {
    id: "f-4",
    title: "极简主义",
    description: "通用清爽界面，专注战斗视野，适配多分辨率。",
    quality: "rare",
    tags: ["免费"],
    priceType: "free",
    mainImage: "/skins/minimalist.jpg",
    backupImages: [],
    sortOrder: 80,
    status: "draft",
    updatedAt: "2025-12-24T10:00",
  },
  {
    id: "f-5",
    title: "坦克要塞",
    description: "威胁值与生存监控强化，副本/团本稳固输出。",
    quality: "epic",
    tags: ["PvE"],
    priceType: "paid",
    price: 31.99,
    mainImage: "/skins/tank-fortress.jpg",
    backupImages: [],
    sortOrder: 70,
    status: "offline",
    updatedAt: "2025-12-12T12:00",
  },
];

const blankDraft: Draft = {
  title: "",
  description: "",
  quality: "common",
  tags: [],
  priceType: "paid",
  price: 0,
  mainImage: "",
  backupImages: [],
  sortOrder: 50,
  status: "draft",
  publishAt: "",
};

function formatDate(value?: string) {
  if (!value) return "";
  return new Date(value).toLocaleString("zh-CN", { hour12: false });
}

function FeaturedPreview({ item }: { item: Draft | FeaturedItem }) {
  const quality = qualityMap[item.quality];
  const priceLabel = item.priceType === "free" ? "免费" : item.price ? `¥${item.price.toFixed(2)}` : "--";

  return (
    <Card className="bg-zinc-900/60 border-zinc-800 text-white">
      <CardHeader className="gap-4">
        <CardTitle className="text-lg font-semibold">实时预览</CardTitle>
        <CardDescription>模拟首页精选卡片，桌面布局</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800/50 aspect-video">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/20 to-zinc-950/70" />
          <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm text-white flex items-center gap-1">
            <span className={cn("w-2 h-2 rounded-full", quality.className)} />
            {quality.label}
          </div>
          {item.tags.length > 0 && (
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="text-xs text-white/80 bg-white/10 px-2 py-1 rounded-full border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center text-zinc-700">
            <UploadCloud className="w-16 h-16" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold truncate">{item.title || "未命名作品"}</h3>
            <span className="text-lg font-semibold text-yellow-400">{priceLabel}</span>
          </div>
          <p className="text-sm text-zinc-400 line-clamp-2 min-h-[40px]">
            {item.description || "填写描述后预览将更新"}
          </p>
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-zinc-950">查看详情</Button>
            <Button size="sm" variant="outline" className="border-zinc-700 text-zinc-200">立即购买</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FeaturedUploadsAdminPage() {
  const [items, setItems] = useState<FeaturedItem[]>(initialData);
  const [view, setView] = useState<"table" | "card">("table");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [qualityFilter, setQualityFilter] = useState<Quality | "all">("all");
  const [tagFilter, setTagFilter] = useState<string | "all">("all");
  const [showDrawer, setShowDrawer] = useState(false);
  const [draft, setDraft] = useState<Draft>(blankDraft);
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string>("");

  const filtered = useMemo(() => {
    return items
      .filter((item) => (statusFilter === "all" ? item.status !== "deleted" : item.status === statusFilter))
      .filter((item) => (qualityFilter === "all" ? true : item.quality === qualityFilter))
      .filter((item) => (tagFilter === "all" ? true : item.tags.includes(tagFilter)))
      .filter((item) => {
        const value = `${item.title}${item.description}${item.tags.join(" ")}`.toLowerCase();
        return value.includes(search.toLowerCase());
      })
      .sort((a, b) => b.sortOrder - a.sortOrder);
  }, [items, qualityFilter, search, statusFilter, tagFilter]);

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const openCreate = () => {
    setDraft(blankDraft);
    setError("");
    setShowDrawer(true);
  };

  const openEdit = (item: FeaturedItem) => {
    setDraft({ ...item });
    setError("");
    setShowDrawer(true);
  };

  const handleDuplicate = (item: FeaturedItem) => {
    const now = new Date().toISOString();
    const clone: FeaturedItem = {
      ...item,
      id: crypto.randomUUID(),
      status: "draft",
      sortOrder: item.sortOrder - 1,
      title: `${item.title} - 副本`,
      updatedAt: now,
    };
    setItems((prev) => [clone, ...prev]);
  };

  const handleDelete = (ids: string[]) => {
    if (ids.length === 0) return;
    const ok = window.confirm(`确认删除选中的 ${ids.length} 条记录？将标记为已删除。`);
    if (!ok) return;
    setItems((prev) => prev.map((item) => (ids.includes(item.id) ? { ...item, status: "deleted" } : item)));
    setSelected(new Set());
  };

  const handleStatusChange = (ids: string[], status: Status) => {
    if (ids.length === 0) return;
    setItems((prev) => prev.map((item) => (ids.includes(item.id) ? { ...item, status } : item)));
    if (status !== "deleted") setSelected(new Set());
  };

  const handleSortBump = (id: string, delta: number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, sortOrder: item.sortOrder + delta } : item)));
  };

  const validateDraft = (value: Draft) => {
    if (!value.title.trim()) return "标题为必填";
    if (!value.mainImage.trim()) return "请上传主图";
    if (value.priceType === "paid" && (value.price ?? 0) <= 0) return "付费作品需填写价格";
    return "";
  };

  const handleFile = (file?: File) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setError("文件需小于 2MB");
      return;
    }
    const url = URL.createObjectURL(file);
    setDraft((prev) => ({ ...prev, mainImage: url }));
  };

  const handleSave = () => {
    const msg = validateDraft(draft);
    if (msg) {
      setError(msg);
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setItems((prev) => {
        const now = new Date().toISOString();
        if (draft.id) {
          return prev.map((item) => (item.id === draft.id ? { ...item, ...draft, id: draft.id, updatedAt: now } : item));
        }
        return [
          {
            ...draft,
            id: crypto.randomUUID(),
            updatedAt: now,
          } as FeaturedItem,
          ...prev,
        ];
      });
      setSaving(false);
      setShowDrawer(false);
      setDraft(blankDraft);
      setError("");
    }, 400);
  };

  const bulkIds = Array.from(selected);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-black text-white">
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-5 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <ChevronLeft className="w-4 h-4" />
              <span>仪表盘</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">精选作品上传管理</span>
            </div>
            <h1 className="text-2xl font-semibold mt-1">首页精选作品管理</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-zinc-700 text-zinc-200" onClick={() => handleStatusChange(filtered.map((i) => i.id), "published")}>
              <Check className="w-4 h-4 mr-2" /> 全部上线
            </Button>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-zinc-950" onClick={openCreate}>
              <Plus className="w-4 h-4 mr-2" /> 新增作品
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-4">
          <Card className="bg-zinc-900/70 border-zinc-800">
            <CardHeader className="gap-3">
              <CardTitle className="text-lg">筛选与视图</CardTitle>
              <CardDescription className="flex flex-wrap gap-2 items-center text-zinc-400">
                <Filter className="w-4 h-4" /> 按状态/品质/标签过滤，支持搜索与视图切换
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2">
                  <Search className="w-4 h-4 text-zinc-500" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="搜索标题/描述/标签"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as Status | "all")}
                  className="h-10 rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-sm"
                >
                  <option value="all">全部状态</option>
                  <option value="published">已发布</option>
                  <option value="draft">草稿</option>
                  <option value="offline">已下线</option>
                  <option value="deleted">已删除</option>
                </select>
                <select
                  value={qualityFilter}
                  onChange={(e) => setQualityFilter(e.target.value as Quality | "all")}
                  className="h-10 rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-sm"
                >
                  <option value="all">全部品质</option>
                  <option value="legendary">传说</option>
                  <option value="epic">史诗</option>
                  <option value="rare">精良</option>
                  <option value="common">优秀</option>
                </select>
                <select
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value as string | "all")}
                  className="h-10 rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-sm"
                >
                  <option value="all">全部标签</option>
                  {tagOptions.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <BadgeInfo className="w-4 h-4" />
                  {filtered.length} 条结果，选中 {selected.size} 条
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={view === "table" ? "default" : "outline"}
                    size="sm"
                    className={cn(view === "table" ? "bg-yellow-500 text-zinc-950" : "border-zinc-700 text-zinc-200")}
                    onClick={() => setView("table")}
                  >
                    <LayoutList className="w-4 h-4 mr-1" /> 表格
                  </Button>
                  <Button
                    variant={view === "card" ? "default" : "outline"}
                    size="sm"
                    className={cn(view === "card" ? "bg-yellow-500 text-zinc-950" : "border-zinc-700 text-zinc-200")}
                    onClick={() => setView("card")}
                  >
                    <LayoutGrid className="w-4 h-4 mr-1" /> 卡片
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/70 border-zinc-800">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">精选作品列表</CardTitle>
                <CardDescription>支持拖动顺序、行内上下线、复制与删除</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-200"
                  onClick={() => handleStatusChange(bulkIds, "published")}
                >
                  上线选中
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-200"
                  onClick={() => handleStatusChange(bulkIds, "offline")}
                >
                  下线选中
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(bulkIds)}
                >
                  删除选中
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {view === "table" ? (
                <div className="overflow-x-auto border border-zinc-800 rounded-xl">
                  <table className="w-full text-sm min-w-[960px]">
                    <thead className="bg-zinc-900/80 text-zinc-400">
                      <tr className="text-left">
                        <th className="px-4 py-3">
                          <input
                            type="checkbox"
                            className="accent-yellow-500"
                            checked={selected.size > 0 && filtered.every((i) => selected.has(i.id))}
                            onChange={(e) => {
                              if (e.target.checked) setSelected(new Set(filtered.map((i) => i.id)));
                              else setSelected(new Set());
                            }}
                          />
                        </th>
                        <th className="px-4 py-3">标题</th>
                        <th className="px-4 py-3">品质</th>
                        <th className="px-4 py-3">标签</th>
                        <th className="px-4 py-3">价格</th>
                        <th className="px-4 py-3">状态</th>
                        <th className="px-4 py-3">排序 <ArrowUpDown className="inline w-4 h-4" /></th>
                        <th className="px-4 py-3">更新时间</th>
                        <th className="px-4 py-3">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((item) => (
                        <tr key={item.id} className="border-t border-zinc-800/80 hover:bg-zinc-800/40">
                          <td className="px-4 py-3 align-top">
                            <input
                              type="checkbox"
                              className="accent-yellow-500"
                              checked={selected.has(item.id)}
                              onChange={() => toggleSelect(item.id)}
                            />
                          </td>
                          <td className="px-4 py-3 align-top">
                            <div className="font-semibold text-white">{item.title}</div>
                            <div className="text-xs text-zinc-400 line-clamp-2">{item.description}</div>
                          </td>
                          <td className="px-4 py-3 align-top">
                            <span className={cn("px-2 py-1 text-xs rounded-full text-white", qualityMap[item.quality].className)}>
                              {qualityMap[item.quality].label}
                            </span>
                          </td>
                          <td className="px-4 py-3 align-top">
                            <div className="flex flex-wrap gap-1 text-xs text-zinc-300">
                              {item.tags.length ? item.tags.map((tag) => (
                                <span key={tag} className="px-2 py-1 rounded-full bg-white/5 border border-white/5">{tag}</span>
                              )) : <span className="text-zinc-500">—</span>}
                            </div>
                          </td>
                          <td className="px-4 py-3 align-top text-white">
                            {item.priceType === "free" ? "免费" : item.price ? `¥${item.price.toFixed(2)}` : "--"}
                          </td>
                          <td className="px-4 py-3 align-top">
                            <span
                              className={cn(
                                "px-2 py-1 rounded-full text-xs",
                                item.status === "published" && "bg-emerald-500/20 text-emerald-300",
                                item.status === "draft" && "bg-yellow-500/20 text-yellow-200",
                                item.status === "offline" && "bg-zinc-700/40 text-zinc-200",
                                item.status === "deleted" && "bg-red-500/20 text-red-200",
                              )}
                            >
                              {statusLabel[item.status]}
                            </span>
                          </td>
                          <td className="px-4 py-3 align-top">
                            <div className="flex items-center gap-2">
                              <Button
                                size="icon-sm"
                                variant="outline"
                                className="border-zinc-700 text-zinc-200"
                                onClick={() => handleSortBump(item.id, 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                              <span className="min-w-[36px] text-center text-white">{item.sortOrder}</span>
                              <Button
                                size="icon-sm"
                                variant="outline"
                                className="border-zinc-700 text-zinc-200"
                                onClick={() => handleSortBump(item.id, -1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                          <td className="px-4 py-3 align-top text-zinc-300 text-xs">{formatDate(item.updatedAt)}</td>
                          <td className="px-4 py-3 align-top">
                            <div className="flex flex-wrap gap-2">
                              <Button size="icon-sm" variant="outline" className="border-zinc-700 text-zinc-200" onClick={() => openEdit(item)}>
                                <PenLine className="w-4 h-4" />
                              </Button>
                              <Button size="icon-sm" variant="outline" className="border-zinc-700 text-zinc-200" onClick={() => handleDuplicate(item)}>
                                <Copy className="w-4 h-4" />
                              </Button>
                              {item.status !== "published" ? (
                                <Button size="icon-sm" className="bg-emerald-500 text-black" onClick={() => handleStatusChange([item.id], "published")}>
                                  <Check className="w-4 h-4" />
                                </Button>
                              ) : (
                                <Button size="icon-sm" variant="outline" className="border-zinc-700 text-zinc-200" onClick={() => handleStatusChange([item.id], "offline")}>
                                  <ArrowUpDown className="w-4 h-4" />
                                </Button>
                              )}
                              <Button size="icon-sm" variant="destructive" onClick={() => handleDelete([item.id])}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filtered.map((item) => (
                    <Card key={item.id} className="bg-zinc-900/70 border-zinc-800">
                      <CardContent className="p-5 space-y-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="accent-yellow-500"
                              checked={selected.has(item.id)}
                              onChange={() => toggleSelect(item.id)}
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-white">{item.title}</span>
                                <span className={cn("text-xs px-2 py-1 rounded-full text-white", qualityMap[item.quality].className)}>
                                  {qualityMap[item.quality].label}
                                </span>
                              </div>
                              <div className="text-xs text-zinc-400 mt-1">{statusLabel[item.status]} · {formatDate(item.updatedAt)}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="icon-sm" variant="outline" className="border-zinc-700 text-zinc-200" onClick={() => openEdit(item)}>
                              <PenLine className="w-4 h-4" />
                            </Button>
                            <Button size="icon-sm" variant="outline" className="border-zinc-700 text-zinc-200" onClick={() => handleDuplicate(item)}>
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button size="icon-sm" variant="destructive" onClick={() => handleDelete([item.id])}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-zinc-300 line-clamp-3">{item.description}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-zinc-300">
                          {item.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 rounded-full bg-white/5 border border-white/5">{tag}</span>
                          ))}
                          {item.tags.length === 0 && <span className="text-zinc-500">无标签</span>}
                        </div>
                        <div className="flex items-center justify-between text-sm text-white">
                          <div className="flex items-center gap-3">
                            <span>{item.priceType === "free" ? "免费" : item.price ? `¥${item.price.toFixed(2)}` : "--"}</span>
                            <span className="text-zinc-400">排序 {item.sortOrder}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="border-zinc-700 text-zinc-200" onClick={() => handleStatusChange([item.id], item.status === "published" ? "offline" : "published")}>
                              {item.status === "published" ? "下线" : "上线"}
                            </Button>
                            <Button size="sm" className="bg-yellow-500 text-black" onClick={() => openEdit(item)}>
                              编辑
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <FeaturedPreview item={draft} />

          <Card className="bg-zinc-900/70 border-zinc-800">
            <CardHeader className="gap-2">
              <CardTitle className="text-lg">新增 / 编辑</CardTitle>
              <CardDescription>抽屉将保留填写内容，便于反复调整与预览</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black" onClick={openCreate}>
                <PenLine className="w-4 h-4 mr-2" /> 打开表单
              </Button>
              <p className="text-sm text-zinc-400 leading-relaxed">
                支持主图上传、品质标签、价格类型、标签多选、排序值和上下线状态。保存前会校验必填项，主图大小建议不超过 2MB，格式 jpg/png/webp。
              </p>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Eye className="w-4 h-4" /> 保存后列表将自动更新并回填更新时间。
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showDrawer && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50 backdrop-blur" onClick={() => setShowDrawer(false)} />
          <div className="w-full max-w-xl h-full bg-zinc-950 border-l border-zinc-800 shadow-2xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-zinc-400">{draft.id ? "编辑作品" : "新增作品"}</p>
                <h2 className="text-xl font-semibold">填写作品信息</h2>
              </div>
              <Button variant="ghost" size="icon" className="text-zinc-300" onClick={() => setShowDrawer(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-300">作品标题 *</label>
                <Input
                  value={draft.title}
                  onChange={(e) => setDraft((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="请输入作品标题"
                  className="mt-1 bg-zinc-900 border-zinc-800 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-300">描述</label>
                <textarea
                  value={draft.description}
                  onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="1-2 句话描述亮点"
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-sm text-white min-h-[96px] focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-zinc-300">品质 *</label>
                  <select
                    value={draft.quality}
                    onChange={(e) => setDraft((prev) => ({ ...prev, quality: e.target.value as Quality }))}
                    className="mt-1 h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-white"
                  >
                    <option value="legendary">传说</option>
                    <option value="epic">史诗</option>
                    <option value="rare">精良</option>
                    <option value="common">优秀</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-zinc-300">状态 *</label>
                  <select
                    value={draft.status}
                    onChange={(e) => setDraft((prev) => ({ ...prev, status: e.target.value as Status }))}
                    className="mt-1 h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-white"
                  >
                    <option value="draft">草稿</option>
                    <option value="published">已发布</option>
                    <option value="offline">已下线</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-zinc-300">价格类型 *</label>
                  <select
                    value={draft.priceType}
                    onChange={(e) => setDraft((prev) => ({ ...prev, priceType: e.target.value as PriceType }))}
                    className="mt-1 h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-white"
                  >
                    <option value="paid">付费</option>
                    <option value="free">免费</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-zinc-300">价格（付费）</label>
                  <Input
                    type="number"
                    value={draft.price ?? 0}
                    onChange={(e) => setDraft((prev) => ({ ...prev, price: Number(e.target.value) }))}
                    className="mt-1 bg-zinc-900 border-zinc-800 text-white"
                    disabled={draft.priceType === "free"}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-zinc-300">标签</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tagOptions.map((tag) => {
                    const active = draft.tags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() =>
                          setDraft((prev) => ({
                            ...prev,
                            tags: active ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
                          }))
                        }
                        className={cn(
                          "px-3 py-1 rounded-full border text-sm",
                          active ? "border-yellow-500 bg-yellow-500/20 text-yellow-200" : "border-zinc-700 text-zinc-300 hover:border-yellow-500"
                        )}
                      >
                        {active && <Check className="w-3 h-3 inline mr-1" />} {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-zinc-300">排序值</label>
                  <Input
                    type="number"
                    value={draft.sortOrder}
                    onChange={(e) => setDraft((prev) => ({ ...prev, sortOrder: Number(e.target.value) }))}
                    className="mt-1 bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-zinc-300">预约上线时间</label>
                  <Input
                    type="datetime-local"
                    value={draft.publishAt || ""}
                    onChange={(e) => setDraft((prev) => ({ ...prev, publishAt: e.target.value }))}
                    className="mt-1 bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-300">主图上传 *</label>
                <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900/70 p-4 text-sm text-zinc-300">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <UploadCloud className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p>拖拽或点击选择图片 (jpg/png/webp &lt; 2MB)</p>
                        {draft.mainImage && <p className="text-xs text-yellow-300 mt-1 line-clamp-1">已选：{draft.mainImage}</p>}
                      </div>
                    </div>
                    <label className="cursor-pointer px-3 py-2 rounded-lg bg-yellow-500 text-black text-sm font-medium hover:bg-yellow-600">
                      选择文件
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFile(e.target.files?.[0])}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-zinc-300">备用图（逗号分隔 URL，可选）</label>
                <Input
                  value={draft.backupImages.join(", ")}
                  onChange={(e) => setDraft((prev) => ({ ...prev, backupImages: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }))}
                  placeholder="https://... , https://..."
                  className="mt-1 bg-zinc-900 border-zinc-800 text-white"
                />
              </div>

              {error && <div className="text-sm text-red-400">{error}</div>}

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-zinc-500 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  保存后可在列表行内继续上下线或复制。
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="border-zinc-700 text-zinc-200" onClick={() => setShowDrawer(false)}>
                    取消
                  </Button>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black" onClick={handleSave} disabled={saving}>
                    {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} 保存
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
