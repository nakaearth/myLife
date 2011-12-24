#coding: utf-8

class Photo < ActiveRecord::Base
  belongs_to :album
  belongs_to :user
  acts_as_taggable
  acts_as_taggable_on :tags
  scope :latest  ,order('updated_at desc')
  validates :title  ,:presence=>true
  validates_attachment_size :photo ,:in =>1..5.megabyte,:message=>'ファイルサイズが大きすぎます' 

  has_attached_file :photo,:url=>":rails_root/public:url",:url=>"/system/img/:attaches/:id/:style/:filename" , :styles => { :medium => "300x300>", :thumb => "100x100>" }
end
