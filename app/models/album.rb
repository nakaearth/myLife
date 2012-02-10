class Album < ActiveRecord::Base
  belongs_to :user
  has_many :photos
  belongs_to :evnet
  scope :latest, order('updated_at desc')
  scope :is_public, where("album_type=1")
  scope :is_comic, where("album_type=2")
  validates :title, :presence=>true
end
