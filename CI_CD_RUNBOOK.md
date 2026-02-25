# CI/CD Runbook (lich1257)

Обновлено: 2026-02-25

Короткая цель документа: чтобы любой человек в проекте понял, когда запускается CI/CD, как вручную сделать деплой, как откатиться и почему docs-коммиты больше не гоняют сборку.

## 1) Что настроено сейчас

- CI: `.github/workflows/ci.yml`
- CD: `.github/workflows/deploy-client.yml`
- Основная ветка автодеплоя: `main`
- Деплой приложения: Docker-контейнер `client_app` на VDS (`3000:3000`)

## 2) Триггеры CI

`CI` запускается на `pull_request`, но только если в PR затронуты пути:

- `client/**`
- `server/**`
- `package.json`
- `yarn.lock`
- `tsconfig.base.json`
- `.github/workflows/ci.yml`

Это значит:
- PR только с `README.md` или другой документацией не запускает CI.
- PR с изменениями кода/зависимостей запускает CI.

### Что делает CI job `lint-type`

1. Checkout
2. Setup Node 20 + yarn cache
3. `yarn install --frozen-lockfile`
4. `yarn lint-staged --allow-empty`
5. `yarn workspace client tsc --noEmit`
6. `yarn workspace server tsc --noEmit`

## 3) Триггеры CD (Deploy Client)

`Deploy Client` запускается:

1. Автоматически на `push` в `main`, но только если изменены пути:
   - `client/**`
   - `client/Dockerfile`
   - `package.json`
   - `yarn.lock`
   - `server/package.json`
   - `tsconfig.base.json`
   - `.dockerignore`
   - `.github/workflows/deploy-client.yml`
2. Вручную через `workflow_dispatch` из GitHub Actions

Это значит:
- push в `main` только с документацией (`*.md`) не запускает деплой.
- push с изменениями клиента/зависимостей/деплойного workflow запускает деплой.

## 4) Как проходит деплой

### Job 1: `build-and-push`

1. Берет SHA коммита как image tag
2. Логинится в GHCR
3. Собирает образ из `client/Dockerfile`
4. Пушит два тега:
   - `latest`
   - `<commit_sha>`

### Job 2: `deploy`

1. Подключается к VDS по SSH
2. Пуллит образ по `<commit_sha>` (fallback: `latest`)
3. Удаляет старый контейнер `client_app`
4. Запускает новый контейнер:
   - `--restart unless-stopped`
   - `-p 3000:3000`
   - ротация логов:
     - `--log-driver json-file`
     - `--log-opt max-size=10m`
     - `--log-opt max-file=5`
5. Чистит dangling images старше 48 часов

## 5) Обязательные GitHub Secrets/Variables

Secrets:
- `VDS_HOST`
- `VDS_PORT`
- `VDS_USER`
- `VDS_SSH_KEY`

Variables:
- `NEXT_PUBLIC_API_URL`

Также используется встроенный `GITHUB_TOKEN` для push в GHCR.

## 6) Как деплоить вручную

1. GitHub -> Actions -> `Deploy Client`
2. Нажать `Run workflow`
3. Выбрать ветку (обычно `main`) и запустить

Используй ручной запуск для:
- быстрой перезагрузки после проблем на сервере
- повторного деплоя того же кода без нового коммита

## 7) Логи и место на диске

Проверка лог-конфига контейнера:

```bash
docker inspect client_app --format '{{json .HostConfig.LogConfig}}'
```

Просмотр логов:

```bash
docker logs -f --tail 200 client_app
```

Если старый лог уже раздулся:

```bash
docker inspect --format='{{.LogPath}}' client_app
sudo truncate -s 0 "$(docker inspect --format='{{.LogPath}}' client_app)"
```

## 8) Откат (rollback)

1. Найти SHA последнего стабильного деплоя в GitHub Actions
2. На сервере запустить:

```bash
docker pull ghcr.io/<owner>/<repo>-client:<old_sha>
docker rm -f client_app || true
docker run -d \
  --name client_app \
  --restart unless-stopped \
  --log-driver json-file \
  --log-opt max-size=10m \
  --log-opt max-file=5 \
  -p 3000:3000 \
  ghcr.io/<owner>/<repo>-client:<old_sha>
```

## 9) Частые вопросы

### Почему на сервере нет `.github/workflows` и `.husky`?

Потому что на сервер едет не git-репозиторий, а Docker-образ runtime-приложения.

### Почему docs-коммит в `main` не запускает деплой?

Потому что в `deploy-client.yml` добавлены `paths`-фильтры. Документация не входит в список путей для автодеплоя.

### Хочу деплой из `master`, а не из `main`

Нужно поменять ветку-триггер в `.github/workflows/deploy-client.yml`:

```yaml
on:
  push:
    branches: [master]
```

