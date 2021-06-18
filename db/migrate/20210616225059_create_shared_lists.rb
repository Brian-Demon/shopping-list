class CreateSharedLists < ActiveRecord::Migration[6.1]
  def change
    create_table :shared_lists do |t|
      t.string :user_id
      t.string :list_id
      t.boolean :active

      t.timestamps
    end
  end
end
