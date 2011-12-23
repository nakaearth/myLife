class User < ActiveRecord::Base
  has_many :albums
  has_many :photos
  validates :name, :presence=>true
  validates :uid, :presence=>true
  validates :token, :presence=>true
  validates :secret, :presence=>true
  
  def self.create_with_omniauth(auth)
    create!do |user|
      user.provider = auth["provider"]
      user.uid=auth["uid"]
      user.name = auth["user_info"]["name"]
      user.image_path=auth["user_info"]["image"]
      user.token=auth['credentials']['token']
      user.secret=auth['credentials']['secret']
    end
  end
end
