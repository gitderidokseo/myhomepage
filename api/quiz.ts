// gyuwon 수업노트 퀴즈의 채점 기록 저장소 (Upstash Redis, Vercel 연동 환경 변수 사용).
// 브라우저는 /gyuwon/api/quiz 로 부르고(vercel.json rewrite), 비밀번호는 middleware.ts가 확인한다.
// GET  ?key=quiz/<퀴즈>/results/<사용자>  → 저장된 JSON 또는 null
// PUT  ?key=...  body=JSON               → 저장
const URL_ = process.env.KV_REST_API_URL
const TOKEN = process.env.KV_REST_API_TOKEN
const KEY_RE = /^quiz\/[\w.-]{1,64}\/results\/[\w.-]{1,64}$/
const MAX_BYTES = 200_000

async function redis(command: string[]): Promise<unknown> {
  const res = await fetch(URL_!, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(command),
  })
  const data = (await res.json()) as { result?: unknown; error?: string }
  if (!res.ok || data.error) throw new Error(data.error ?? `redis ${res.status}`)
  return data.result
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}

function keyOf(request: Request): string | null {
  const key = new URL(request.url).searchParams.get('key') ?? ''
  return KEY_RE.test(key) ? `gyuwon:${key}` : null
}

export async function GET(request: Request): Promise<Response> {
  if (!URL_ || !TOKEN) return json({ error: 'storage not configured' }, 500)
  const key = keyOf(request)
  if (!key) return json({ error: 'bad key' }, 400)
  const value = await redis(['GET', key])
  return json(typeof value === 'string' ? JSON.parse(value) : null)
}

export async function PUT(request: Request): Promise<Response> {
  if (!URL_ || !TOKEN) return json({ error: 'storage not configured' }, 500)
  const key = keyOf(request)
  if (!key) return json({ error: 'bad key' }, 400)
  const text = await request.text()
  if (text.length > MAX_BYTES) return json({ error: 'too large' }, 413)
  try {
    const parsed = JSON.parse(text)
    if (typeof parsed !== 'object' || parsed === null) throw new Error()
  } catch {
    return json({ error: 'bad json' }, 400)
  }
  await redis(['SET', key, text])
  return json({ ok: true })
}
