require "test_helper"

class ListsControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  setup do
    List.destroy_all
    Rails.application.env_config["omniauth.auth"] = OmniAuth.config.mock_auth[:google_oauth2]
  end

  test "valid list is created" do
    post "/auth/google_oauth2"
    follow_redirect!
    post lists_path, params: { name: "Shopping Place" }
    list = List.last
    assert_equal "Shopping Place", list.name
  end

  test "valid list redirects to list page" do
    post "/auth/google_oauth2"
    follow_redirect!
    post lists_path, params: { name: "Shopping Place" }
    list = List.last
    assert_redirected_to root_path
  end

  test "invalid list redirects to root path with correct notice" do
    post "/auth/google_oauth2"
    follow_redirect!
    post lists_path
    assert_equal 0, List.count
    assert_redirected_to root_path
    assert_equal "Invalid list name", flash[:notice]
  end

  test "guest trying to create a valid list redirects to root path" do
    post lists_path, params: { name: "Shopping Place" }
    assert_redirected_to root_path
  end

  test "user can destroy a valid list successfully" do
    post "/auth/google_oauth2"
    follow_redirect!
    list = User.last.lists.create(name: "Shopping Place")
    delete list_path(list)
    assert_equal 0, List.count
  end

  test "user is redirected to root with success notice when valid list is destroyed" do
    post "/auth/google_oauth2"
    follow_redirect!
    list = User.last.lists.create(name: "Shopping Place")
    delete list_path(list)
    assert_redirected_to root_path
    assert_equal "List deleted", flash[:notice]
  end

  test "user cannot destroy non-existant list" do
    post "/auth/google_oauth2"
    follow_redirect!
    list = User.last.lists.create(name: "Shopping Place")
    delete list_path(12345)
    assert_redirected_to root_path
    assert_equal "List not found", flash[:notice]
  end

  test "user cannot a nil list" do
    post "/auth/google_oauth2"
    follow_redirect!
    assert_raises ActionController::RoutingError do
      delete "/lists/"
    end
  end

  test "user cannot destroy someone elses list" do
    someone_else = User.create(username: "Someone Else", provider: "Nowhere", uid: "31459")
    list = someone_else.lists.create(name: "Shopping Place")
    post "/auth/google_oauth2"
    follow_redirect!
    delete list_path(list)
    assert_redirected_to root_path
    assert_equal "List not found", flash[:notice]
  end

  test "guest cannot destroy someone elses list" do
    someone_else = User.create(username: "Someone Else", provider: "Nowhere", uid: "31459")
    list = someone_else.lists.create(name: "Shopping Place")
    delete list_path(list)
    assert_redirected_to root_path
    assert_equal "You must be signed in to do that.", flash[:notice]
  end
end
