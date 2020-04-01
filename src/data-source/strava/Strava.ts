type TokenState = {
  access: string;
  refresh: string;
  expires: string;
};

export class StravaDataSource {
  constructor(
    protected endpoint: string,
    protected accessToken: string,
    protected refreshToken: string
  ) {}


}
