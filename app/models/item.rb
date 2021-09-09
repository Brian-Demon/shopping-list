class Item < ApplicationRecord
  belongs_to :list
  validates :name, presence: true, uniqueness: { scope: [:list_id, :person], message: "is already on the list for this person." }
  validates :person, presence: true
  validates :location, presence: true
  validates :quantity, numericality: { greater_than_or_equal_to: 0 }

  def self.previous_item_data user
    previous_items = Item.joins(:list).where(list: { user: user}).pluck(:name, :person, :location)
    previous_data = { names: [], people: [], locations: [] }
    
    previous_items.each do |item|
      previous_data[:names].push(item[0]) unless previous_data[:names].include? item[0]
      previous_data[:people].push(item[1]) unless previous_data[:people].include? item[1]
      previous_data[:locations].push(item[2]) unless previous_data[:locations].include? item[2]
    end

    previous_data
  end

  def remove_from_list
    update(quantity: 0, deleted_at: Time.now)
  end

  def add_back_to_list
    update(quantity: 1, deleted_at: nil, bought: false)
  end

  def active
    deleted_at.nil?
  end

  def serializable_hash(*)
    super({
      only: [
        :name,
        :person,
        :location,
        :bought,
        :id,
        :quantity,
      ],
    }).merge(
      active: active
    )
  end
end
