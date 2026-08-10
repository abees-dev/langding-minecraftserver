export interface Player {
  id: number;
  username: string;
  realname: string;
  email?: string | null;
  point: number;
  lastlogin?: number | null;
  regdate?: number;
}

export interface UserCheckResponse {
  exists: boolean;
  username?: string;
  realname?: string;
  point?: number;
  message?: string;
}
