class Photo < ActiveRecord::Base
  belongs_to :album
  validates :title  ,:presence=>true
  has_attached_file :photo, :styles => { :medium => "300x300>", :thumb => "100x100>" }
end
