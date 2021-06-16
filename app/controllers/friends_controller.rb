class FriendsController < ApplicationController
  before_action :require_user_logged_in!
  before_action :set_friend, only: %i[ show edit update destroy ]

  def index
    @friends = Friend.joins(:user).where(user_id: current_user.id )
  end

  def show
  end

  def new
    @friend = Friend.new
  end

  def edit
  end

  def create
    @friend = Friend.new(friend_params)
    param_email = friend_params[:email]
    if( User.find_by(email: param_email) )
      if current_user.friends.find_by(email: param_email)
        redirect_back(fallback_location: root_path, notice: "#{param_email} is already your friend")
      else
        respond_to do |format|
          if @friend.save
            format.html { redirect_to new_friend_path, notice: "Friend request sent to #{param_email}" }
            format.json { render :show, status: :created, location: @friend }
          else
            format.html { render :new, status: :unprocessable_entity }
            format.json { render json: @friend.errors, status: :unprocessable_entity }
          end
        end
      end
    else
      redirect_back(fallback_location: root_path, notice: "User not found")
    end
  end

  def update
    respond_to do |format|
      if @friend.update(friend_params)
        format.html { redirect_to @friend, notice: "Friend was successfully updated." }
        format.json { render :show, status: :ok, location: @friend }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @friend.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @friend.destroy
    respond_to do |format|
      format.html { redirect_to friends_url, notice: "Friend was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    def set_friend
      @friend = Friend.find(params[:id])
    end

    def friend_params
      params.require(:friend).permit(:email, :username, :uid, :user_id)
    end
end
