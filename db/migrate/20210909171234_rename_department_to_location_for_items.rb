class RenameDepartmentToLocationForItems < ActiveRecord::Migration[6.1]
  def change
    rename_column :items, :department, :location
  end
end
