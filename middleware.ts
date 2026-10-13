// /gyuwon/* 접근 시 비밀번호(Basic 인증)를 요구한다. 사용자 이름은 아무 값이나 가능.
const PASSWORD = '1703'

export const config = {
  matcher: ['/gyuwon', '/gyuwon/:path*'],
}

export default function middleware(request: Request): Response | undefined {
  const header = request.headers.get('authorization') ?? ''
  if (header.startsWith('Basic ')) {
    try {
      const decoded = atob(header.slice(6))
      const password = decoded.slice(decoded.indexOf(':') + 1)
      if (password === PASSWORD) return undefined
    } catch {
      // 잘못된 헤더는 아래에서 401 처리
    }
  }
  return new Response('비밀번호가 필요합니다.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="gyuwon", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
