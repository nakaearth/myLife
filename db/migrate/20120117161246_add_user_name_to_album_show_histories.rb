class AddUserNameToAlbumShowHistories < ActiveRecord::Migration
  def change
    add_column :album_show_histories, :user_name, :string
  end
end
