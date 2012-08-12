#coding: utf-8

class Photo < ActiveRecord::Base
  belongs_to :album
  belongs_to :user
  acts_as_taggable
  acts_as_taggable_on :tags
  scope :latest  ,order('updated_at desc')
  validates :title  ,:presence=>true
  validates_attachment_size :photo ,:in =>1..5.megabyte,:message=>'ファイルサイズが大きすぎます' 

  S3_CREDENTIALS={:access_key_id=> ENV['S3_ACCESS_KEY_ID'], :secret_access_key=>ENV['S3_SECRET_KEY'], :bucket=>"mylife-bucket"}

  if Rails.env.production? 
    has_attached_file :photo,
      :storage => :s3,
      :s3_credentials=>S3_CREDENTIALS,
      :styles => { :medium => "350x350>", :thumb => "100x100>",:original=>"700x700>"},
      :url => ":s3_domain_url",
      :path=>"photos/:id/:style/:filename"
  else 
    has_attached_file :photo,
      :url=>"/system/img/attaches/:id/:style/:filename" ,
      :styles => { :medium => "350x350>", :thumb => "100x100>",:original=>"700x700>"}
  end
  
end
