Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, Rails.application.credentials.dig(:google_oauth2, :api_key), Rails.application.credentials.dig(:google_oauth2, :api_secret)
end