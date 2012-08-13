Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
  provider :twitter,"HKSkVKAmsPNhAXEDmZP2w","9lu5yNeGjFWdfaA8nrizmHmJMty86a7vLNLbq8Vh4"
#  provider :twitter,ENV["TWITTER_ACCESS_TOKEN"],ENV["TWITTER_SECRET"]
end 
