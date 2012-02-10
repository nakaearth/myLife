class AddEventIdToAlbums < ActiveRecord::Migration
  def change
    add_column :albums, :event_id, :integer
  end
end
