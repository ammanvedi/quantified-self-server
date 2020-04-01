export type StravaAPIActivity = {
  resource_state: number;
  athlete: {
    id: number;
    resource_state: number;
  };
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  workout_type: string | null;
  id: number;
  external_id: string;
  upload_id: number;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  start_latlng: [number, number];
  end_latlng: [number, number];
  location_city: string | null;
  location_state: string | null;
  location_country: string | null;
  start_latitude: number;
  start_longitude: number;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: {
    id: string;
    summary_polyline: string;
    resource_state: number;
  };
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility: string;
  flagged: boolean;
  gear_id: number | null;
  from_accepted_tag: boolean;
  upload_id_str: string;
  average_speed: number;
  max_speed: number;
  has_heartrate: boolean;
  average_heartrate: number;
  max_heartrate: number;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: boolean;
  elev_high: number;
  elev_low: number;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
};

export type ActivitiesResponse = Array<StravaAPIActivity>;

export type RefreshTokenResponse = {
  token_type: "Bearer",
  access_token: string,
  refresh_token: string,
  expires_at: number,
  expires_in: string,
}