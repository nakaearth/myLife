class User < ActiveRecord::Base
  has_many :albums
  validates :name, :presence=>true
  validates :uid, :presence=>true
  validates :token, :presence=>true
  validates :secret, :presence=>true
 # mount_uploader :image,ImageUploader
  
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

  def profile_path
    if image_path.empty?
      "images/not_image.png"
    else
      image_path
    end
  end
end
