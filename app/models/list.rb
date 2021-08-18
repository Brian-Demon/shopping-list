class List < ApplicationRecord
  belongs_to :user
  has_many :shared_users, class_name: "User", through: :shared_lists
  has_many :items, dependent: :destroy do
    def active
      where(deleted_at: nil)
    end
    def bought
      where(bought: true)
    end
    def unbought
      where(bought: false)
    end
  end
  validates :name, length: { minimum: 1 }
  validates :name, uniqueness: true;

  def add_item params
    item = items.new(
      name: params[:name].downcase.camelize, 
      person: params[:person].downcase.camelize, 
      department: params[:department].downcase.camelize, 
      quantity: 1
    )

    if item.valid?
      item.name = params[:name]
      item.person = params[:person]
      item.department = params[:department]
      item.save
    end

    item
  end

  def as_json(*)
    super({
      only: [:id, :name],
      include: [:items]
      }).merge({
        unbought_count: items.unbought.count,
        item_count: items.active.count,
        active: items.active
      })
  end
end
