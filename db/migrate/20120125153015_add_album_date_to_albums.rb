class AddAlbumDateToAlbums < ActiveRecord::Migration
  def change
    add_column :albums, :album_date, :datetime
  end
end
