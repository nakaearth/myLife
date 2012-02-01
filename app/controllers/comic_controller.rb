class ComicController < ApplicationController
  layout 'albums'

  def index
    @comics=Album.where('user_id=?',session[:user_id]).is_comic.latest.paginate(:page=>params[:page], :per_page=>5)
  end

  def new
    @comic=Album.new
    @photos = Photo.where('user_id=?',session[:user_id]).latest.paginate(:page=>params[:page], :per_page=>20)
  end

  def create
  end

  def update
  end

  def edit
  end

  def show
  end

  def destroy
  end

end
