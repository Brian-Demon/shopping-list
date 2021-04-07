require "application_system_test_case"

class ListsTest < ApplicationSystemTestCase
  setup do
    List.destroy_all
    Rails.application.env_config["omniauth.auth"] = OmniAuth.config.mock_auth[:google_oauth2]
  end

  test "authenticated user can create a new List" do
    login! 
    visit root_path

    fill_in "Create New List", with: "Shopping List"
    click_on "Create List"
    assert_equal 1, List.count
    list = List.last

    assert_equal "Shopping List", list.name
    assert_current_path list_path(list)
    assert_text "Shopping List List"
  end

  test "unauthenticated user cannot create a new List" do
    visit root_path 
    assert_none_of_selectors ".create-list form"
  end

  test "logged in user with lists show  correct list and items on root page" do
    login!
    user = User.last
    list = user.lists.create(name: "Shopping Place")
    list.items.create(name: "Bananas", person: "Person", department: "Produce")
    visit root_path
    assert_selector ".shopping-list", count: 1
    assert_css ".shopping-list .card-title", text: "Shopping Place"
    within ".shopping-list .item-count" do
      assert_text "Items: 1"
    end
  end

  test "logged in user can edit their lists" do
    login!
    user = User.last
    list = user.lists.create(name: "Shopping Place")
    list.items.create(name: "Bananas", person: "Person", department: "Produce")
    visit root_path
    assert_selector ".shopping-list", count: 1
    within ".shopping-list" do
      click_on "Edit List"
    end
  end

  test "logged in user can delete a list" do
    login!
    user = User.last
    list = user.lists.create(name: "Shopping Place")
    list.items.create(name: "Bananas", person: "Person", department: "Produce")
    visit root_path
    assert_selector ".shopping-list", count: 1
    within ".shopping-list" do
      click_on "Edit List"
    end
    accept_confirm do
      click_link 'Delete List'
    end
    sleep 0.1

    assert_equal 0, List.count
    assert_selector ".alert.alert-info", text: "List deleted"
  end
end