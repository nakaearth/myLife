#coding: utf-8

class PhotosController < ApplicationController
  before_filter :has_albums?

  # GET /photos
  # GET /photos.json
  def index
    if params[:tag] == nil
      @photos = Photo.where('user_id=?',session[:user_id]).latest.paginate(:page=>params[:page], :per_page=>10)
    else
      @photos = Photo.tagged_with(params[:tag]).where('user_id=?',session[:user_id]).latest.paginate(:page=>params[:page],:per_page=>10)
    end
    @tags = Photo.tag_counts_on(:tags)
    @tag_name=params[:tag]
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @photos }
    end
  end

  # GET /photos/1
  # GET /photos/1.json
  def show
    @photo = Photo.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @photo }
    end
  end

  # GET /photos/new
  # GET /photos/new.json
  def new
    @photo = Photo.new
    @albums = Album.where('user_id=?',session[:user_id]).latest
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @photo }
    end
  end

  # GET /photos/1/edit
  def edit
    @photo = Photo.find(params[:id])
    @albums = Album.where('user_id=?',session[:user_id])
  end

  # POST /photos
  # POST /photos.json
  def create
    @photo = Photo.new(params[:photo])
    @photo.user_id=session[:user_id]
    @photo.album_id= params[:photo][:album_id]
    respond_to do |format|
      if @photo.save
        format.html { redirect_to @photo, notice: 'Photo was successfully created.' }
        format.json { render json: @photo, status: :created, location: @photo }
      else
        format.html { render action: "new" }
        format.json { render json: @photo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /photos/1
  # PUT /photos/1.json
  def update
    @photo = Photo.find(params[:id])
    @photo.user_id=session[:user_id]
    @photo.album_id= params[:photo][:album_id]
    respond_to do |format|
      if @photo.update_attributes(params[:photo])
        format.html { redirect_to @photo, notice: 'Photo was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @photo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /photos/1
  # DELETE /photos/1.json
  def destroy_photo
    @photo = Photo.find(params[:id])
    @photo.destroy
#    @photo.delete_photo
    redirect_to photos_url ,notice: '写真を削除しました!'
  end

  private  
  def has_albums?
    unless Album.where('user_id=?',session[:user_id]).count(:id) > 0
      redirect_to new_album_url ,notice: 'You must create a album before uploading your images.'
    end
  end

end
