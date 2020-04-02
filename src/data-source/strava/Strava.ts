import fetch from 'node-fetch'
import {
  buildActivitiesUrl,
  buildRefreshTokenUrl,
  stravaAPIToGQLType,
} from './helpers'
import { StravaAPIActivity } from '../../types/Strava'
import { StravaRunningActivity } from '../../types/Schema'
import { logErr, logInfo, logSucc } from '../../lib/logging'

enum AuthenticationState {
  AUTHENTICATED,
  FETCHING_TOKEN,
  UNAUTHENTICATED,
  ERROR,
}

type TokenState = {
  access: string | null
  refresh: string
  expires: number | null
}

export class StravaDataSource {
  private static DEFAULT_REFRESH_INTERVAL = 1000 * 60 * 60 * 4

  private tokenState: TokenState
  private authState: AuthenticationState = AuthenticationState.UNAUTHENTICATED
  private inProgressAuthentication: Promise<void>

  constructor(
    private endpoint: string,
    private refreshToken: string,
    private clientId: string,
    private clientSecret: string,
    private refreshIntervalMs: number = StravaDataSource.DEFAULT_REFRESH_INTERVAL
  ) {
    logInfo('Creating strava data service')
    this.tokenState = {
      refresh: refreshToken,
      access: null,
      expires: null,
    }

    setInterval(() => {
      this.inProgressAuthentication = this.refreshAuthToken()
    }, this.refreshIntervalMs)

    this.inProgressAuthentication = this.refreshAuthToken()
  }

  public getActivities(
    limit: number
  ): Promise<Array<StravaRunningActivity> | null> {
    logInfo('Fetching activities')
    const url = buildActivitiesUrl(this.endpoint, limit)

    return this.inProgressAuthentication.then(() => {
      if (this.authState !== AuthenticationState.AUTHENTICATED) {
        return null
      }

      return fetch(url, {
        headers: {
          Authorization: `Bearer ${this.tokenState.access}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          const stravaData: Array<StravaAPIActivity> = data
          logSucc(`Fetched activities count: ${stravaData.length}`)

          return stravaData.map(stravaAPIToGQLType)
        })
    })
  }

  private refreshAuthToken(): Promise<void> {
    logInfo('Refreshing auth token')
    this.authState = AuthenticationState.FETCHING_TOKEN
    const url = buildRefreshTokenUrl(
      this.clientId,
      this.clientSecret,
      this.tokenState.refresh
    )

    return fetch(url, {
      method: 'POST',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failing response when fetching token')
        }
        return res
      })
      .then(res => res.json())
      .then(res => {
        logSucc('Got new token')
        this.tokenState = {
          refresh: res.refresh_token,
          access: res.access_token,
          expires: res.expires_at,
        }
        this.authState = AuthenticationState.AUTHENTICATED
      })
      .catch(() => {
        logErr('Failed to fetch token')
        this.authState = AuthenticationState.ERROR
      })
      .finally(() => {
        this.inProgressAuthentication = Promise.resolve()
      })
  }
}
