#coding: utf-8

class EventsController < ApplicationController
  def show
    unless is_my_event? session[:user_id]
        redirect_to :action=>'index', :controller=>'calendar' 
    else
      @event=Event.find(params[:id])
      @albums= Album.where("user_id=?",session[:user_id]).where("album_date>=?",@event.start_at).where('album_date <= ?',@event.end_at).paginate(:page=>params[:page],:per_page=>10)
    end
  end

  def create
    @event=Event.new(params[:event])
    @event.user_id=session[:user_id]
    respond_to do |format|
      if @event.save
        format.html { redirect_to @event, notice: 'Event was successfully created.' }
        format.json { render json: @event, status: :created, location: @event }
      else
        format.html { render action: "new" }
        format.json { render json: @event.errors, status: :unprocessable_entity } 
      end
    end
  end

  def new
    @event=Event.new
    respond_to do |format|
      format.html
      format.json { render json: @event}
    end
  end

  def edit
    @event = Event.find(params[:id])
  end

  def update
    @event=Event.find(params[:id])
    @event.user_id=session[:user_id]
    respond_to do |format|
      if @event.update_attributes(params[:event])
        format.html { redirect_to @event, notice: 'Event was successfully created.' }
        format.html { redirect_to }
        format.json { head :ok}
      else
        format.html { render action=>'edit' }
        format.json { render json: @event.errors, status: unprocessable_entity}
      end
    end  
  end

  def destroy
  end

  private
  def is_my_event? user_id
    if (user_id!=session[:user_id])
      false
    else
      true
    end
  end

end
