import { StravaAPIActivity } from '../../types/Strava'
import { StravaRunningActivity } from '../../types/Schema'

export const buildRefreshTokenUrl = (
  clientId: string,
  clientSecret: string,
  refreshToken: string
) =>
  `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token&refresh_token=${refreshToken}`

export const buildActivitiesUrl = (base: string, limit: number) => `${base}/athlete/activities?per_page=${limit}`

export const stravaAPIToGQLType = (
  apiType: StravaAPIActivity
): StravaRunningActivity => ({
  name: apiType.name,
  distance: apiType.distance,
  movingTime: apiType.moving_time,
  elapsedTime: apiType.elapsed_time,
  startDateTime: apiType.start_date,
  elevation: {
    elevationGain: apiType.total_elevation_gain,
    minElevation: apiType.elev_low,
    maxElevation: apiType.elev_high,
  },
  location: {
    startPosition: {
      lat: apiType.start_latlng[0],
      lng: apiType.start_latlng[1],
    },
    endPosition: {
      lat: apiType.end_latlng[0],
      lng: apiType.end_latlng[1],
    },
    city: apiType.location_city,
    state: apiType.location_state,
    country: apiType.location_country,
    mapPolyline: apiType.map.summary_polyline,
  },
  speed: {
    averageSpeed: apiType.average_speed,
    maxSpeed: apiType.max_speed,
  },
  ...(apiType.has_heartrate
    ? {
        heart: {
          averageHeartrate: apiType.average_heartrate,
          maxHeartrate: apiType.max_heartrate,
        },
      }
    : {}),
})
