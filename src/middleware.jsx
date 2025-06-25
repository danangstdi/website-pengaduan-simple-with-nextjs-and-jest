import { NextResponse } from 'next/server'

export function middleware(request) {
  const session = request.cookies.get('jalankita_auth_cookie')
  const { pathname } = request.nextUrl

  const authPages = ['/login']
  const isAuthPage = authPages.some(path => pathname.startsWith(path))

  const protectedPages = [
    '/dashboard',
  ]
  const isProtectedPage = protectedPages.some(path => pathname.startsWith(path))

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (isProtectedPage && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard'
  ],
}
