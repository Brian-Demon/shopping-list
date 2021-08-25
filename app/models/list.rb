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
    def unbought_and_active
      unbought.active
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

  def is_shared_with?(u)
    user != u
  end

  def shared_list_owner
    user.first_name + " " + user.last_name
  end

  def share_count
    SharedList.where(list_id: self.id).length
  end
end
