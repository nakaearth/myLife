class Album < ActiveRecord::Base
  belongs_to :user
  has_many :photos
  scope :latest, order('updated_at desc')
  scope :is_public, where("public_flag=1")
  validates :title, :presence=>true
end
