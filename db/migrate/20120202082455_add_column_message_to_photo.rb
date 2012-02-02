class AddColumnMessageToPhoto < ActiveRecord::Migration
  def change
    add_column :photos, :message, :string ,:size=>140
  end
end
