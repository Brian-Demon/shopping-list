class ItemsController < ApplicationController
  before_action :require_user_logged_in!
  
  def create
    @list = List.find_by(id: params[:list_id])
    @item = @list.items.new(name: params[:name], person: params[:person], department: params[:department])

    if @item.save
      redirect_to list_path(@list), notice: "#{@item.name} added to the list for #{@item.person}"
    else
      redirect_to list_path(@list), notice: @item.errors.full_messages.join(", ")
    end
  end

  def destroy
    if @item = Item.find_by(id: params[:id])
      @item.destroy
      redirect_to root_path, notice: "Item deleted"
    else
      redirect_back(fallback_location: root_path, notice: "Item not found")
    end
  end
end
