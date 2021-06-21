class ChangeIdTypes < ActiveRecord::Migration[6.1]
  def up
    change_column :shared_lists, :user_id, :integer
    change_column :shared_lists, :list_id, :integer
  end

  def down
    change_column :shared_lists, :user_id, :string
    change_column :shared_lists, :list_id, :string
  end
end
