class ListsController < ApplicationController
  before_action :require_user_logged_in!
  
  def create
    @list = current_user.lists.new(name: params[:name])
    if @list.save
      respond_to do |format|
        format.html { redirect_to root_path, notice: "List created" }
        format.json { render json: { message: "List created", id: @list.id } }
      end
    else
      respond_to do |format|
        format.html { redirect_to root_path, notice: "Invalid list name" }
        format.json { render json: { message: "Invalid list name", id: @list.id } }
      end
    end
  end

  def edit
    @previous_item_names = Item.joins(:list).where(list: { user: current_user}).pluck(:name).uniq
    @previous_item_people = Item.joins(:list).where(list: { user: current_user}).pluck(:person).uniq
    @previous_item_locations = Item.joins(:list).where(list: { user: current_user}).pluck(:location).uniq
    @list = List.find_by(id: params[:id])
  end

  def show
    @previous_item_names = Item.joins(:list).where(list: { user: current_user}).pluck(:name).uniq
    @previous_item_people = Item.joins(:list).where(list: { user: current_user}).pluck(:person).uniq
    @previous_item_locations = Item.joins(:list).where(list: { user: current_user}).pluck(:location).uniq
    @list = List.find_by(id: params[:id])
  end

  def destroy
    if @list = current_user.lists.find_by(id: params[:id])
      @list.destroy
      respond_to do |format|
        format.html { redirect_to root_path, notice: "List deleted" }
        format.json { render json: { message: "List deleted", id: @list.id } }
      end
    else
      respond_to do |format|
        format.html { redirect_to root_path, notice: "List not found" }
        format.json { render json: { message: "List not found", id: @list.id } }
      end
    end
  end

  def remove_bought
    if @list = current_user.lists.find_by(id: params[:id])
      @list.items.active.bought.each do |item|
        item.remove_from_list
      end
      render json: { message: "Bought items removed" }
    else
      render json: { error: "List not found" }, status: 404
    end
  end
end
