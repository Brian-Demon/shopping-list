require "application_system_test_case"

class ItemsTest < ApplicationSystemTestCase
  setup do
    List.destroy_all
    Rails.application.env_config["omniauth.auth"] = OmniAuth.config.mock_auth[:google_oauth2]
  end

  def create_previous_shopping_list! user
    previous_list = user.lists.create(name: "Aldi")
    previous_list.items.create(name: "Bananas", person: "Brian", location: "Produce")
    previous_list.items.create(name: "Apples", person: "Myk", location: "Produce")
    previous_list.items.create(name: "Beer", person: "Brian", location: "Alcohol")
  end

  test "logged in user can add an item to a list" do
    login!
    user = User.find_by(uid: "31415")
    list = user.lists.create(name: "Shopping Place")
    visit list_path(list)
    fill_in("Item name:", with: "Bananas")
    fill_in("Person:", with: "Brian")
    fill_in("Location:", with: "Produce")
    click_on "Add Item"
    assert_selector ".items-table-item", count: 1
    within ".items-table-item" do
      assert_text "Bananas"
    end
  end

  test "logged in user can not add an item with a blank attribute" do
    login!
    user = User.find_by(uid: "31415")
    list = user.lists.create(name: "Shopping Place")
    visit list_path(list)
    fill_in("Item name:", with: "")
    fill_in("Person:", with: "Brian")
    fill_in("Location:", with: "Produce")
    click_on "Add Item"
    assert_selector ".the-list .list-item", count: 0
  end

  test "logged in user populates item name suggestions from previous lists" do
    login!
    user = User.find_by(uid: "31415")
    create_previous_shopping_list! user 
    list = user.lists.create(name: "Shopping Place")
    visit list_path(list)
    assert_selector "#item_name_datalist_options option", count: 3, visible: false
    assert_selector "#item_name_datalist_options option", text: "Bananas", visible: false
    assert_selector "#item_name_datalist_options option", text: "Apples", visible: false
    assert_selector "#item_name_datalist_options option", text: "Beer", visible: false
  end

  test "logged in user populates people name suggestions from previous list" do
    login!
    user = User.find_by(uid: "31415")
    create_previous_shopping_list! user 
    list = user.lists.create(name: "Shopping Place")
    visit list_path(list)
    assert_selector "#item_person_datalist_options option", count: 2, visible: false
    assert_selector "#item_person_datalist_options option", text: "Brian", visible: false
    assert_selector "#item_person_datalist_options option", text: "Myk", visible: false
  end

  test "logged in user populates location name suggestions from previous list" do
    login!
    user = User.find_by(uid: "31415")
    create_previous_shopping_list! user
    list = user.lists.create(name: "Shopping Place")
    visit list_path(list)
    assert_selector "#item_location_datalist_options option", count: 2, visible: false
    assert_selector "#item_location_datalist_options option", text: "Produce", visible: false
    assert_selector "#item_location_datalist_options option", text: "Alcohol", visible: false
  end

  test "logged in user cannot add item when name finds a case insensitive match" do
    login!
    user = User.find_by(uid: "31415")
    create_previous_shopping_list! user
    list = user.lists.create(name: "Shopping Place")
    visit list_path(list)
    fill_in("Item name:", with: "BaNaNas")
    fill_in("Person:", with: "Brian")
    fill_in("Location:", with: "Produce")
    assert_selector "#item_location_datalist_options option", count: 2, visible: false
    assert_selector "#item_location_datalist_options option", text: "Produce", visible: false
    assert_selector "#item_location_datalist_options option", text: "Alcohol", visible: false
  end
end