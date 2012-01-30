class RenamePublicFlagToAlbumType < ActiveRecord::Migration
  def change 
    remove_index :albums, [:user_id,:public_flag, :updated_at]
    rename_column :albums, :public_flag, :album_type
    add_index :albums, [:user_id,:album_type, :updated_at]
  end
end
