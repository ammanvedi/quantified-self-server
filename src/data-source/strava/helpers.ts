export const buildRefreshTokenUrl = (
  clientId: string,
  clientSecret: string,
  refreshToken: string
) =>
  `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token&refresh_token=${refreshToken}`;

export const buildActivitiesUrl = (base: string) =>
  `${base}/athlete/activities`;
