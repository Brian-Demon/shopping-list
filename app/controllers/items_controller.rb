class ItemsController < ApplicationController
  before_action :require_user_logged_in!
  
  def create
    @list = List.find_by(id: params[:list_id])
    result = false
    if @item = @list.items.find_by(name: params[:name], person: params[:person])
      result = @item.add_back_to_list
    else
      @item = @list.add_item(params)
      result = @item.valid?
    end

    if result
      respond_to do |format|
        format.html { redirect_to list_path(@list), notice: "#{@item.name} added to the list for #{@item.person}" }
        format.json { render json: { message: "Item Created", id: @item.id } }
      end
    else
      respond_to do |format|
        format.html { redirect_to list_path(@list), notice: @item.errors.full_messages.join(", ") }
        format.json { render json: { message: "Could not create item", errors: @item.errors } }
      end
    end
  end

  def update
    @item = Item.find_by(id: params[:id])
    if @item.update(item_params)
      respond_to do |format|
        format.html { redirect_to @item.list, notice: "Item updated" }
        format.json { render json: { message: "Item updated", item: @item.attributes } }
      end
    else
      respond_to do |format|
        format.html { redirect_to @item.list, notice: "Item not updated", status: 422 }
        format.json { render json: { message: "Could not update item", errors: @item.errors } }
      end
    end
  end

  def destroy
    if @item = Item.find_by(id: params[:id])
      @item.destroy
      redirect_to items_path, notice: "Item deleted"
    else
      redirect_back(fallback_location: root_path, notice: "Item not found")
    end
  end

  def index
    @items = Item.joins(:list).where(list: { user: current_user })
  end

  def item_params
    params.permit(:bought, :name, :person, :department, :quantity)
  end

  def remove
    if @item = Item.find_by(id: params[:id])
      if @item.remove_from_list
        render json: { message: "Item removed" }
      else
        render json: { error: "Item could not be removed" }, status: 422
      end
    else
      render json: { error: "Item not found" }, status: 404
    end
  end
end
