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
    assert_redirected_to list_path(list)
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

  

end
