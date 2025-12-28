import { Button } from '@/components/ui/button';

interface SkinInfoPanelProps {
  name: string;
  quality: string;
  description: string;
  price: number;
  features?: string[];
  onBuy?: () => void;
  onDetail?: () => void;
  compact?: boolean;
}

export default function SkinInfoPanel({ name, quality, description, price, features, onBuy, onDetail, compact = false }: SkinInfoPanelProps) {
  return (
    <div className={`p-6 flex flex-col gap-4 ${compact ? 'min-w-[200px] text-sm bg-zinc-950/60' : 'min-w-[260px]'}`}>
      <div className="flex items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          quality === 'legendary' ? 'bg-orange-500/90 text-white' :
          quality === 'epic' ? 'bg-purple-500/90 text-white' :
          quality === 'rare' ? 'bg-blue-500/90 text-white' :
          'bg-green-500/90 text-white'
        }`}>
          {quality === 'legendary' ? '传说' :
           quality === 'epic' ? '史诗' :
           quality === 'rare' ? '精良' : '优秀'}
        </span>
        <h3 className={`font-bold text-white truncate ${compact ? 'text-lg' : 'text-2xl'}`}>{name}</h3>
      </div>
      <p className="text-zinc-400 text-sm min-h-[40px]">{description}</p>
      {features && features.length > 0 && (
        <ul className="flex flex-wrap gap-2 text-xs text-yellow-400">
          {features.map(f => <li key={f} className="bg-yellow-500/10 px-2 py-1 rounded">{f}</li>)}
        </ul>
      )}
      <div className={`flex items-center justify-between pt-2 border-t border-zinc-800 mt-2 ${compact ? 'pt-1' : ''}`}>
        <div className={`font-bold text-yellow-500 ${compact ? 'text-lg' : 'text-2xl'}`}>¥{price.toFixed(2)}</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-zinc-700 hover:border-yellow-500 text-zinc-300" onClick={onDetail}>
            详情
          </Button>
          <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-zinc-950" onClick={onBuy}>
            购买
          </Button>
        </div>
      </div>
    </div>
  );
}
