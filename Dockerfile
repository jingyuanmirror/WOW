# 多阶段构建：优化镜像大小
# 阶段1：构建
FROM node:20-alpine AS builder

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm@10.26.2

# 复制依赖声明文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建 Next.js 应用
RUN pnpm build

# 阶段2：运行
FROM node:20-alpine

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm@10.26.2

# 只复制必要的运行文件
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 安装生产依赖
RUN pnpm install --prod --frozen-lockfile

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "start"]
