class Item < ApplicationRecord
  belongs_to :list
  validates :name, presence: true, uniqueness: { scope: [:list_id, :person], message: "is already on the list for this person." }
  validates :person, presence: true
  validates :department, presence: true
end
