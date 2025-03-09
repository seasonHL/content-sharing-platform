# 使用 Node.js 20 基础镜像
FROM node:20-alpine

# 安装 pnpm
RUN npm install -g pnpm

# 设置工作目录
WORKDIR /app

# 复制 pnpm-lock.yaml 和 package.json 到工作目录
COPY pnpm-lock.yaml package.json ./

# 安装项目依赖
RUN pnpm install --frozen-lockfile

# 复制项目文件到工作目录
COPY . .

# 构建 NestJS 项目
RUN pnpm run build

# 暴露服务端口，根据你的 NestJS 项目配置修改
EXPOSE 3000

# 启动 NestJS 服务
CMD ["pnpm", "run", "start:prod"]