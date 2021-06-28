class ChangeIdTypes < ActiveRecord::Migration[6.1]
  def up
    remove_column :shared_lists, :user_id
    add_column :shared_lists, :user_id, :integer
    remove_column :shared_lists, :list_id
    add_column :shared_lists, :list_id, :integer
  end

  def down
    remove_column :shared_lists, :user_id
    add_column :shared_lists, :user_id, :string
    remove_column :shared_lists, :list_id
    add_column :shared_lists, :list_id, :string
  end
end
