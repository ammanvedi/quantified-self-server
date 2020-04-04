import fetch from 'node-fetch'

import {
  TidalFavoriteTracksResponse,
  TidalLoginResponse,
} from '../../types/Tidal'
import {
  buildFavoritesUrl,
  buildLoginUrl,
  tidalAPITrackToGQLType,
} from './helpers'
import { logErr, logInfo, logSucc } from '../../lib/logging'
import { MusicTrack } from '../../types/Schema'

type LoginState = TidalLoginResponse | null

export class TidalDataSource {
  private loginState: LoginState = null
  private static DEFAULT_REFRESH_INTERVAL = 1000 * 60 * 60 * 4

  private inProgressAuthentication: Promise<void>

  constructor(
    private readonly endpoint: string,
    private readonly username: string,
    private readonly password: string,
    private readonly webToken: string,
    private readonly refreshInterval: number = TidalDataSource.DEFAULT_REFRESH_INTERVAL
  ) {
    logInfo('Creating Tidal data service')

    this.inProgressAuthentication = this.login()

    setInterval(() => {
      this.inProgressAuthentication = this.login()
    }, this.refreshInterval);
  }

  public async getFavoriteTracks(limit: number): Promise<Array<MusicTrack>> {
    const url = buildFavoritesUrl(
      this.endpoint,
      this.webToken,
      0,
      limit,
      this.loginState.sessionId,
      this.loginState.userId
    )

    return fetch(url, {
      method: 'GET',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch favorites')
        }
        return res
      })
      .then(res => res.json())
      .then(res => {
        const apiRes = res as TidalFavoriteTracksResponse
        return apiRes.items.map(tidalAPITrackToGQLType)
      })
  }

  private async login(): Promise<void> {
    logInfo('Logging into Tidal')
    return fetch(buildLoginUrl(this.endpoint, this.webToken), {
      method: 'POST',
      headers: {
        'x-tidal-token': this.webToken,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${this.username}&password=${this.password}`,
    })
      .then(res => {
        if (!res.ok) {
          logErr(
            `Failed to authenticate with Tidal, response status ${res.status}`
          )
          logErr(`Body: ${res.body}`)
          throw new Error('Failed to log in to Tidal')
        }
        return res
      })
      .then(res => res.json())
      .then(res => {
        logSucc('Authenticated with Tidal')
        this.loginState = res
      })
      .catch(() => {
        this.loginState = null
      })
      .finally(() => {
        this.inProgressAuthentication = Promise.resolve()
      })
  }
}
