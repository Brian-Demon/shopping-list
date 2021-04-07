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
end
