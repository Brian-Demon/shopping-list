module ApplicationHelper
  def user_avatar user
    if user.image
      image_tag user.image, width: 32
    end
  end
end
