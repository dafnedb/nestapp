export type CookieData = {
    name: string
    value: string
    maxAge: number
  }
  export function redirectWithCookies(location: string, cookies: CookieData[]) {
    const headers = new Headers()
    headers.append('Location', location)

    for (const cookie of cookies) {
      headers.append('Set-Cookie', `${cookie.name}=${cookie.value}; SameSite=Strict; Path=/; Max-Age=${cookie.maxAge}`)
    }

    return new Response(null, {
      status: 302,
      headers: headers
    })
  }