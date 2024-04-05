import { jwtDecode } from 'jwt-decode'

type DecodedToken = {
  exp: number
  iat: number
  id: string
  role: { id: number; name: string }
  sessionId: string
  status: { id: number; name: string }
}

export const decodeAccessToken = (accessToken: string) => {
  if (!accessToken) return undefined

  return jwtDecode<DecodedToken>(accessToken)
}
