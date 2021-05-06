class Item < ApplicationRecord
  belongs_to :list
  validates :name, presence: true, uniqueness: { scope: [:list_id, :person], message: "is already on the list for this person." }
  validates :person, presence: true
  validates :department, presence: true

  def self.previous_item_data user
    previous_items = Item.joins(:list).where(list: { user: user}).pluck(:name, :person, :department)
    previous_data = { names: [], people: [], departments: []}
    
    previous_items.each do |item|
      previous_data[:names].push(item[0]) unless previous_data[:names].include? item[0]
      previous_data[:people].push(item[1]) unless previous_data[:people].include? item[1]
      previous_data[:departments].push(item[2]) unless previous_data[:departments].include? item[2]
    end

    previous_data
  end
end
