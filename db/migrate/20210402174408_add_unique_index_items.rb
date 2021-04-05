class AddUniqueIndexItems < ActiveRecord::Migration[6.1]
  def change
    add_index :items, [:list_id, :name, :person], unique: true
  end
end
