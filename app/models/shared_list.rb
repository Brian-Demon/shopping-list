class SharedList < ApplicationRecord
  belongs_to :user
  belongs_to :list

  validates :user, 
    exclusion: { 
      in: -> (shared_list) { [shared_list.list.user] }, 
      message: "cannot be yourself",
   }
end
