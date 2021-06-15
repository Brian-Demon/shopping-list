class CreateFriends < ActiveRecord::Migration[6.1]
  def change
    create_table :friends do |t|
      t.string :email
      t.string :username
      t.string :uid

      t.timestamps
    end
  end
end
