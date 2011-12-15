class TopController < ApplicationController
  def index
    @albums = Album.latest.is_public.paginate(:page => params[:page], :per_page => 5)
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @albums }
    end
    
  end

end
