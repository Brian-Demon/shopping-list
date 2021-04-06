class ListsController < ApplicationController
  before_action :require_user_logged_in!
  
  def create
    if @list = current_user.lists.create(name: params[:name])
      redirect_to @list
    else
      redirect_to root_path, notice: "Invalid list name"
    end
  end

  def show
    @list = List.find_by(id: params[:id])
  end

  def destroy
    if @list = current_user.lists.find(params[:id])
      @list.destroy
      redirect_to root_path, notice: "List deleted"
    else
      redirect_back(fallback_location: root_path, notice: "List not found")
    end
  end
end