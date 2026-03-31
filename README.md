# 内容分享平台

## 数据库迁移说明（MySQL -> Supabase）

当前服务已切换为 `PostgreSQL` 驱动，以便连接 Supabase Postgres，实体结构保持不变（继续使用 TypeORM Entity）。  

### 环境变量

优先使用 Supabase 提供的连接串（按以下优先级读取）：

```env
POSTGRES_URL=postgres://<user>:<password>@<pooler-host>:6543/postgres?sslmode=require
# 兼容:
POSTGRES_PRISMA_URL=postgres://<user>:<password>@<pooler-host>:6543/postgres?sslmode=require&pgbouncer=true
# 旧变量:
SUPABASE_DB_URL=postgres://<user>:<password>@<pooler-host>:6543/postgres?sslmode=require
DB_SSL=true
```

## 文件存储迁移说明（腾讯云 COS -> Vercel Blob）

上传接口已从腾讯云 COS 切换为 Vercel Blob：

- 单图上传：`POST /upload/image`
- 多图上传：`POST /upload/images`

环境变量：

```env
# 变量名固定为 BLOB_READ_WRITE_TOKEN
BLOB_READ_WRITE_TOKEN=<your-vercel-blob-token>
```

也支持分项配置（未配置 `SUPABASE_DB_URL` 时使用）：

```env
POSTGRES_HOST=<your-supabase-host>
POSTGRES_PORT=6543
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<password>
POSTGRES_DATABASE=postgres

# 兼容旧变量:
DB_HOST=<your-supabase-host>
DB_PORT=6543
DB_USERNAME=postgres
DB_PASSWORD=<password>
DB_DATABASE=postgres
DB_SSL=true
```
