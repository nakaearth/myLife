Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
#  provider :twitter,"7751092-0WGw7QM1RBLt7nbZtRPHkRBHt5efVrwlq9D31efNri","HLfQ7y2U50T7Tf7E7iYBGxF1Z8cAl4IUBcIFIQYNfTs"
  provider :twitter,ENV["TWITTER_ACCESS_TOKEN"],ENV["TWITTER_SECRET"]
end 
