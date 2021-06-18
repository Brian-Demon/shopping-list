class HomeController < ApplicationController
  def index
    @previous_item_data = Item.previous_item_data current_user
    @all_lists = []
    if current_user
      current_user.lists.each do |list|
        @all_lists << list
      end
      current_user.shared_lists.each do |shared_list|
        if list = List.find_by(id: shared_list.list_id)
          @all_lists << list
        end
      end
    end
  end
end
