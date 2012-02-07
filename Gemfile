source 'http://rubygems.org'

gem 'rails', '3.1.1'

# Bundle edge Rails instead:
# gem 'rails',     :git => 'git://github.com/rails/rails.git'
group :development, :test do
  gem 'sqlite3'
end
group :production do
  gem 'newrelic_rpm'
end

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.1.4'
  gem 'coffee-rails', '~> 3.1.1'
  gem 'uglifier', '>= 1.0.3'
end

gem 'jquery-rails'

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# Use unicorn as the web server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'ruby-debug19', :require => 'ruby-debug'

group :test do
  # Pretty printed test output
  gem 'turn', :require => false
end
gem "omniauth", "0.3.2"
gem "haml-rails"
gem "json"
gem "will_paginate"
#gem "jpmobile", :require => "action_pack"
gem "jpmobile"
gem "bartt-ssl_requirement", :require => "ssl_requirement"
gem "sprockets", "~> 2.0"
gem "dalli"
gem "whenever"
gem "carrierwave"
gem "rspec"
gem "rspec-rails", :group => :development
#gem "paperclip", "~> 2.4"
gem 'paperclip', :git => 'git://github.com/thoughtbot/paperclip.git'
gem "aws-sdk"

gem 'acts-as-taggable-on', '~>2.2.0'
gem 'event-calendar', :require => 'event_calendar'

group :production do
  gem 'pg'
  gem 'therubyracer-heroku', '0.8.1.pre3' # you will need this too
end

