class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :title
      t.integer :point
      t.integer :user_id
      t.text :description

      t.timestamps
    end
  end
end
