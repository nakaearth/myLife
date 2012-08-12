class User < ActiveRecord::Base
  has_many :albums
  has_many :photos
  has_many :events
  validates :name, :presence=>true
  validates :uid, :presence=>true
  validates :token, :presence=>true
  validates :secret, :presence=>true
  
  def self.create_with_omniauth(auth)
    user=User.new
    user.provider=auth["provider"]
    user.uid=auth["uid"]
    unless auth["info"].blank?
      user.name=auth["info"]["name"]
      user.image_path=auth["info"]["image"] 
    end
    unless auth["credentials"].blank?
      user.token=auth["credentials"]["token"] 
      user.secret=auth["credentials"]["secret"] 
    end
    unless auth.credentials.token.blank?
      p auth.credentials.token
      user.token=auth.credentials.token
    end
    user.save
    user
  end

  def profile_path
    if image_path.empty?
      "images/not_image.png"
    else
      image_path
    end
  end

end
