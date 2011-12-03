class AddColumnPhotoToPhoto < ActiveRecord::Migration
  def change
    add_column :photos, :photo_file_name, :string
    add_column :photos, :photo_content_type, :string
    add_column :photos, :file_size, :integer
  end
end
