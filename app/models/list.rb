class List < ApplicationRecord
  belongs_to :user
  has_many :items, dependent: :destroy do
    def active
      where(deleted_at: nil)
    end
  end 

  validates :name, length: { minimum: 1 }
end
