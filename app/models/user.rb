class User < ApplicationRecord
  has_many :lists, dependent: :destroy
  validates :provider, presence: true
  validates :uid, presence: true
  validates :username, presence: true

  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.username = auth["info"]["name"]
      user.image = auth["info"]["image"]
    end
  end
end
