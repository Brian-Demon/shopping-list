class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.belongs_to :list, null: false, foreign_key: true
      t.string :name
      t.string :person
      t.string :department
      t.boolean :bought, default: false

      t.timestamps
    end
  end
end
