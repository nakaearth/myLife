class CalendarController < ApplicationController
  
  def index
    @month = (params[:month] || (Time.zone || Time).now.month).to_i
    @year = (params[:year] || (Time.zone || Time).now.year).to_i

    @shown_month = Date.civil(@year, @month)

    #@event_strips = Event.event_strips_for_month(@shown_month)
    @event_strips = current_user.events.event_strips_for_month(@shown_month)
    @events = Event.all
    p @events.size
  end
 
  def day
    redirect_to :action=>'new' ,:controller=>'events'
  end

  def new

  end
  
end
