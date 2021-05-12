class AddDeletedAtToItems < ActiveRecord::Migration[6.1]
  def change
    add_column :items, :deleted_at, :timestamp
  end
end
