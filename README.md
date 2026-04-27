# PatitasUp

PatitasUp ahora incluye autenticación con Supabase SSR, persistencia de perfiles con Prisma sobre PostgreSQL y protección de rutas lista para desplegar en Vercel.

## Variables de entorno

Usá [.env.example](.env.example) como referencia y definí estas variables en local y en Vercel:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/patitasup"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-supabase-publishable-key"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

`NEXT_PUBLIC_SUPABASE_ANON_KEY` también está soportada como fallback para proyectos viejos de Supabase.

## Puesta en marcha

```bash
pnpm install
pnpm db:generate
pnpm db:migrate --name init-auth
pnpm dev
```

Abrí `http://localhost:3000/login` o `http://localhost:3000/register`.

## Qué hace esta implementación

- Usa `@supabase/ssr` con `middleware.ts` para refrescar cookies y proteger `/perfil`.
- Ejecuta login y registro con server actions, validación con Zod y redirecciones seguras.
- Sincroniza cada usuario autenticado con la tabla `Profile` en PostgreSQL usando Prisma.
- Expone `/auth/confirm` para confirmar correo electrónico y `/auth/signout` para cerrar sesión.
- Mantiene Prisma listo para Vercel con `postinstall: prisma generate`.

## Configuración en Supabase

Configurá en Supabase Auth:

- `Site URL`: tu dominio público, por ejemplo `https://patitasup.vercel.app`
- `Redirect URLs`: `http://localhost:3000/auth/confirm` y tu dominio productivo con la misma ruta

Si tenés confirmación de email habilitada, el registro deja la cuenta creada en Supabase y Prisma, y completa la sesión cuando el usuario vuelve por `/auth/confirm`.

## Despliegue en Vercel

- Cargá las mismas variables de entorno del archivo de ejemplo.
- Asegurate de que `DATABASE_URL` apunte a PostgreSQL con pooling apto para serverless.
- Ejecutá la migración contra la base real antes de abrir el flujo de registro en producción.
