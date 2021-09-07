class AddLocationColumnBooleanToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :display_location, :boolean, default: false
  end
end
