class ComicController < ApplicationController
  layout 'comic'

  def index
    @comics=Album.where('user_id=?',session[:user_id]).is_comic.latest.paginate(:page=>params[:page], :per_page=>5)
  end

  def new
    @comic=Album.new
  end

  def create
    @comic=Album.new(params[:comic])
    if @comic.save
      redirect_to @comic, :action=>'select_photos',:controller=>'comic'
    else
      render 'new'
    end
  end

  def select_photos
    @photos = Photo.where('user_id=?',session[:user_id]).latest.paginate(:page=>params[:page], :per_page=>20)
  end

  def update
  end

  def edit
  end

  def show
    @comic = Album.find(params[:id])
    @photo_list = @comic.photos
  end

  def destroy
  end

end
