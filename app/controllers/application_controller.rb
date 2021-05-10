class ApplicationController < ActionController::Base
  helper_method :current_user

  def require_user_logged_in!
    redirect_to root_path, notice: "You must be signed in to do that." if current_user.nil?
  end

  private
 
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id] unless User.count == 0
  end
end
