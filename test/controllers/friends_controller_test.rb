require "test_helper"

class FriendsControllerTest < ActionDispatch::IntegrationTest
  setup do
    User.destroy_all
    Friend.destroy_all
    @friend = User.create(
      email: "user1@test.com",
      username: "user1",
      uid: "100",
      provider: "google_oauth2",
    )
    Rails.application.env_config["omniauth.auth"] = OmniAuth.config.mock_auth[:google_oauth2]
  end

  def make_friend!
    User.second.friends.create(user_id: User.second.id,
      email: @friend.email,
      username: @friend.username,
      uid: @friend.uid,
    )
  end

  def friend_params
    {
      email: @friend.email,
      username: @friend.username,
      uid: @friend.uid,
      user_id: User.second.id,
    }
  end

  test "should get index" do
    post "/auth/google_oauth2"
    follow_redirect!

    get friends_url
    assert_response :success
  end
  
  test "should get new" do
    post "/auth/google_oauth2"
    follow_redirect!
    get new_friend_url
    assert_response :success
  end

  test "should show friend" do
    post "/auth/google_oauth2"
    follow_redirect!
    assert_redirected_to root_path
    get "/friends/"
    assert_response :success
  end

  test "should get edit" do
    post "/auth/google_oauth2"
    follow_redirect!
    make_friend!
    assert_equal 1, User.second.friends.count
    get "/friends/#{User.first.id}/edit"
    assert_response :success
  end

  test "should destroy friend" do
    post "/auth/google_oauth2"
    follow_redirect!
    make_friend!
    assert_equal 1, User.second.friends.count

    user_friend = Friend.first
    assert_difference('Friend.count', -1) do
      delete friend_url(user_friend)
    end

    assert_redirected_to friends_path
  end

  test "should create friend" do
    post "/auth/google_oauth2"
    follow_redirect!

    assert_difference('Friend.count') do
      post "/friends", params: { friend: friend_params }
    end

    assert_redirected_to "/friends/#{Friend.first.id}"
  end

  test "user cannot friend the same user twice" do
    post "/auth/google_oauth2"
    follow_redirect!
    make_friend!
    assert_equal 1, User.second.friends.count
    assert_equal 1, Friend.count

    post "/friends", params: { friend: friend_params }
    assert_equal "#{User.first.email} is already your friend", flash[:notice]
    assert_equal 1, Friend.count
  end
end
