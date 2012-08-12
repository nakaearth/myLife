Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
  provider :twitter,ENV['TWITTER_ACCESS_TOKEN'],ENV['TWITTER_SECRET']
end 
