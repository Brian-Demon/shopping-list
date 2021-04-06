class List < ApplicationRecord
  belongs_to :user
  has_many :items, dependent: :destroy
  validates :name, length: { minimum: 1 }

end
