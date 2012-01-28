class AddIndexToAlbums < ActiveRecord::Migration
  def change
    add_index :albums, [:user_id,:public_flag, :updated_at]
    add_index :albums, [:user_id, :album_date]
    add_index :photos, :user_id
  end
end
