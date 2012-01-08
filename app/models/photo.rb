#coding: utf-8
require 'aws/s3'

class Photo < ActiveRecord::Base
  belongs_to :album
  belongs_to :user
  acts_as_taggable
  acts_as_taggable_on :tags
  scope :latest  ,order('updated_at desc')
  validates :title  ,:presence=>true
  validates_attachment_size :photo ,:in =>1..5.megabyte,:message=>'ファイルサイズが大きすぎます' 
  if Rails.env.production? 
    has_attached_file :photo,
      :storage => :s3,
      :s3_credentials=>"#{Rails.root}/config/s3.yml",
      :url => ":s3_domain_url",
      :path=>"photos/:id/:style/:filename"
  else 
    has_attached_file :photo,
      :url=>"/system/img/attaches/:id/:style/:filename" ,
      :styles => { :medium => "350x350>", :thumb => "100x100>" }
  end
end
