class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.string :title
      t.integer :user_id
      t.integer :public_flag
      t.text :description

      t.timestamps
    end
  end
end
