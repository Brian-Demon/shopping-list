class HomeController < ApplicationController
  def index
    @previous_item_data = Item.previous_item_data current_user
  end
end
