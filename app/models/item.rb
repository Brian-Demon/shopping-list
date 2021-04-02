class Item < ApplicationRecord
  belongs_to :list
  validates :name, uniqueness: { scope: [:list_id, :person], message: "is already on the list for this person." }
end
