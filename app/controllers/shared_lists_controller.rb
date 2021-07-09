class SharedListsController < ApplicationController
  before_action :require_user_logged_in!

  def create
    list_id = shared_params[:list_id]
    email = shared_params[:email]
    user_list_shared_with = User.find_by(email: email)
    @shared_list = SharedList.new(
      list_id: list_id,
      user_id: user_list_shared_with&.id
    )
    if @shared_list.save
      respond_to do |format|
        format.html { redirect_to root_path,
          notice: "#{List.find_by(id: list_id).name} shared with #{email}"
        }
        format.json { render json: {
          message: "#{List.find_by(id: list_id).name} shared with #{email}"
          }
        }
      end
    else
      respond_to do |format|
        format.html { redirect_to root_path, notice: @shared_list.errors.full_messages }
        format.json { render json: { message: @shared_list.errors.full_messages } }
      end
    end
  end

  private

  def shared_params
    params.permit(:list_id, :email, :shared_list)
  end
end