class Event < ActiveRecord::Base
  has_event_calendar
  belongs_to :user
  has_one :album
end
