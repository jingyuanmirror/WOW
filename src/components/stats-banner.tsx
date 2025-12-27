'use client';

import { motion } from 'framer-motion';
import { Users, Package, Star, Download } from 'lucide-react';

const STATS = [
  {
    icon: Users,
    value: '100,000+',
    label: '活跃用户',
    color: 'text-gray-300',
  },
  {
    icon: Package,
    value: '50+',
    label: '皮肤作品',
    color: 'text-gray-300',
  },
  {
    icon: Star,
    value: '4.9/5.0',
    label: '用户评分',
    color: 'text-gray-300',
  },
  {
    icon: Download,
    value: '1,000,000+',
    label: '总下载次数',
    color: 'text-gray-300',
  },
];

export function StatsBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gray-900/20 via-gray-800/20 to-gray-900/20 py-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Icon */}
              <motion.div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  delay: index * 0.1 + 0.2,
                }}
              >
                <stat.icon className={`h-12 w-12 ${stat.color}`} />
              </motion.div>

              {/* Value */}
              <motion.div
                className={`mb-2 text-4xl font-bold lg:text-5xl ${stat.color}`}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1 + 0.3,
                }}
              >
                {stat.value}
              </motion.div>

              {/* Label */}
              <div className="text-sm text-gray-400 lg:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-50" />
    </section>
  );
}
