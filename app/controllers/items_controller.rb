class ItemsController < ApplicationController
  before_action :require_user_logged_in!

  def create
    @list = List.find_by(id: params[:list_id])
    if @item = @list.items.create(name: params[:name], person: params[:person], department: params[:department])
      redirect_to root_path, notice: "Item: #{@item.name} added to list: #{@list.name}"
    else
      redirect_to root_path, notice: "Invalid item"
    end
  end
end
