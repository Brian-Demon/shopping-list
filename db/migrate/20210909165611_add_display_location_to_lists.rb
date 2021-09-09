class AddDisplayLocationToLists < ActiveRecord::Migration[6.1]
  def change
    add_column :lists, :display_location, :boolean, default: false
  end
end
