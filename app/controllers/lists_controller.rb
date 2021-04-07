class ListsController < ApplicationController
  before_action :require_user_logged_in!
  
  def create
    @list = current_user.lists.new(name: params[:name])
    if @list.save
      redirect_to @list
    else
      redirect_to root_path, notice: "Invalid list name"
    end
  end

  def edit
    @previous_item_names = Item.joins(:list).where(list: { user: current_user}).pluck(:name).uniq
    @previous_item_people = Item.joins(:list).where(list: { user: current_user}).pluck(:person).uniq
    @previous_item_departments = Item.joins(:list).where(list: { user: current_user}).pluck(:department).uniq
    @list = List.find_by(id: params[:id])
  end

  def show
    @previous_item_names = Item.joins(:list).where(list: { user: current_user}).pluck(:name).uniq
    @previous_item_people = Item.joins(:list).where(list: { user: current_user}).pluck(:person).uniq
    @previous_item_departments = Item.joins(:list).where(list: { user: current_user}).pluck(:department).uniq
    @list = List.find_by(id: params[:id])
  end

  def destroy
    if @list = current_user.lists.find_by(id: params[:id])
      @list.destroy
      redirect_to root_path, notice: "List deleted"
    else
      redirect_back(fallback_location: root_path, notice: "List not found")
    end
  end
end