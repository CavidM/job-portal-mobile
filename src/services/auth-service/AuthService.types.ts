export interface TokenType {
  token: string
  refreshToken: string
}

export interface RefreshTokenResponse extends TokenType{}
