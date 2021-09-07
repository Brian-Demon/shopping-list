class OptionsController < ApplicationController
  before_action :require_user_logged_in!

  def index
    if current_user
      @display_location = current_user.display_location
    else
      @display_location = false
    end
  end

  def update_display_location
    user = User.find(params[:id])
    if user.update(display_location: !user.display_location)
      respond_to do |format|
        format.html { redirect_to options_path, notice: "Location option updated: #{user.display_location}" }
        format.json { render json: { message: "Location option updated: #{user.display_location}", user: user.attributes } }
      end
    else
      respond_to do |format|
        format.html { redirect_to @item.list, notice: "Options not updated", status: 422 }
        format.json { render json: { message: "Could not update Location Option", errors: user.errors } }
      end
    end
  end
end
