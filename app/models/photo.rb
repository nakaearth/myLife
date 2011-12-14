class Photo < ActiveRecord::Base
  belongs_to :album
  scope :latest  ,order('update_at desc')
  validates :title  ,:presence=>true
  has_attached_file :photo, :styles => { :medium => "300x300>", :thumb => "100x100>" }
end
