class HomeController < ApplicationController
  def index
    @previous_item_data = Item.previous_item_data current_user
    if current_user
      @all_lists = current_user.lists + current_user.user_shared_lists
    else
      @all_lists = []
    end
  end
end
