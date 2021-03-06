class User < ApplicationRecord
  has_many :shared_lists
  has_many :lists, dependent: :destroy
  has_many :user_shared_lists, :through => :shared_lists, class_name: "List", :source => :list
  validates :provider, presence: true
  validates :uid, presence: true
  validates :username, presence: true

  def self.create_with_omniauth(auth)
    create! do |user|
      user.email = auth["info"]["email"]
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.username = auth["info"]["name"]
      user.image = auth["info"]["image"]
      user.first_name = auth["info"]["first_name"]
      user.last_name = auth["info"]["last_name"]
    end
  end
end
