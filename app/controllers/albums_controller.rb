
class AlbumsController < ApplicationController
  # GET /albums
  # GET /albums.json
  def index
    @albums = Album.where('user_id=?',session[:user_id]).latest.paginate(:page=>params[:page], :per_page=>5)
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @albums }
    end
  end

  # GET /albums/1
  # GET /albums/1.json
  def show
    @album = Album.find(params[:id])
    if my_album? @album
      @photos= Photo.where('album_id =?',params[:id])
      respond_to do |format|
        format.html # show.html.erb
        format.json { render json: @album }
      end
    else
      respond_to do |format|
        format.html { redirect_to albums_url }
        format.json { head :ok }
      end
    end
  end

  # GET /albums/1
  # GET /albums/1.json
  def show_album_photo_list
    @album = Album.find(params[:id])
    if my_album? @album
      @photos= Photo.where('album_id =?',params[:id]).paginate(:page=>params[:page],:per_page=>10)
#      render :stream => true
      respond_to do |format|
        format.html # show.html.erb
        format.json { render json: @album }
      end
    else
      respond_to do |format|
        format.html { redirect_to albums_url }
        format.json { head :ok }
      end
    end
  end

  def show_public_album_photo_list
    @album = Album.find(params[:id])
    if @album.public_flag
      @photos= Photo.where('album_id =?',params[:id]).paginate(:page=>params[:page],:per_page=>8)
      @history=AlbumShowHistory.new
      @history.user_id=session[:user_id]
      @history.album_id=params[:id]
      @history.user_name=current_user.name
      @history.save!  
      @album_viewer_list=AlbumShowHistory.where('user_id != ?',session[:user_id])    
      respond_to do |format|
        format.html
        format.json { render json: @album }
      end 
    else
      respond_to do |format|
        format.html
        format.html { redirect_to root_url }
        format.json { head :ok } 
      end 
    end
  end

  # GET /albums/new
  # GET /albums/new.json
  def new
    @album = Album.new
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @album }
    end
  end

  # GET /albums/1/edit
  def edit
    @album = Album.find(params[:id])
  end

  # POST /albums
  # POST /albums.json
  def create
    @album = Album.new(params[:album])
    @album.user_id=session[:user_id]
    
    respond_to do |format|
      if @album.save
        format.html { redirect_to @album, notice: 'Album was successfully created.' }
        format.json { render json: @album, status: :created, location: @album }
      else
        format.html { render action: "new" }
        format.json { render json: @album.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /albums/1
  # PUT /albums/1.json
  def update
    @album = Album.find(params[:id])
    @album.user_id=session[:user_id]
    respond_to do |format|
      if @album.update_attributes(params[:album])
        format.html { redirect_to @album, notice: 'Album was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @album.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /albums/1
  # DELETE /albums/1.json
  def destroy_album
    @album = Album.find(params[:id])
    @album.destroy

    respond_to do |format|
      format.html { redirect_to albums_url }
      format.json { head :ok }
    end
  end

  private
  def my_album? album
    if album.user_id != session[:user_id]
      false
    else
      true
    end
  end
end
