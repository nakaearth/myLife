class AlbumShowHistory < ActiveRecord::Base
  scope :latest , order('updated_at desc')
end
