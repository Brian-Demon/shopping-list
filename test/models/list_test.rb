require "test_helper"

class ListTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  setup do
    List.destroy_all
    SharedList.destroy_all
    Rails.application.env_config["omniauth.auth"] = OmniAuth.config.mock_auth[:google_oauth2]
  end

  def setup_shared_lists!
    @owner = User.create!(
      email: "owner@test.com",
      provider: "google_oauth2",
      username: "Owner",
      uid: 1,
      first_name: "Owner",
      last_name: "Test"
    )
    @shared_1 = User.create!(
      email: "shared_1@test.com",
      provider: "google_oauth2",
      username: "shared_1",
      uid: 2,
      first_name: "shared_1",
      last_name: "Test"
    )
    @shared_2 = User.create!(
      email: "shared_2@test.com",
      provider: "google_oauth2",
      username: "shared_2",
      uid: 3,
      first_name: "shared_2",
      last_name: "Test"
    )
    @owner.lists.create(name: "ShoppingPlace")
    list = List.last
    SharedList.create!(user_id: @shared_1.id, list_id: list.id)
    SharedList.create!(user_id: @shared_2.id, list_id: list.id)
  end

  test "only a list with a name is valid" do
    user = User.create(username: "Person", uid: "31415", provider: "lols")
    list = List.create(user: user, name: "Beer Run List")
    assert list.valid?
  end

  test "a list without a name is invalid" do
    list = List.create(name: "")
    refute list.valid?
  end

  test "as_json call on list with no items returns expected output" do
    list = List.create(name: "Shopping Place", id: 1)
    assert_equal(
      {
        "id"=>1,
        "user_id"=>list.user_id,
        "name"=>"Shopping Place",
        "created_at"=>list.created_at,
        "updated_at"=>list.updated_at,
      },
      list.as_json
    )
  end

  test "as_json call on list with items returns expected output" do
    user = User.create!(username: "Person", uid: "31415", provider: "lols")
    List.create(user_id: user.id, name: "Shopping Place")
    list = List.last
    list.items.create(
      name: "Item 1",
      person: "Person 1",
      department: "Department 1"
    ).save
    list.items.create(
      name: "Item 2",
      person: "Person 2",
      department: "Department 2"
    ).save
    assert_equal(
      {
        "id"=>list.id,
        "user_id"=>list.user_id,
        "name"=>"Shopping Place",
        "created_at"=>list.created_at.strftime('%Y-%m-%dT%H:%M:%S.%LZ'),
        "updated_at"=>list.updated_at.strftime('%Y-%m-%dT%H:%M:%S.%LZ'),
      },
      list.as_json
    )
  end

  test "is_shared_with? returns correct outcome" do
    setup_shared_lists!

    assert_equal 2, SharedList.count

    list = List.last
    assert_equal true, list.is_shared_with?(@shared_1)
    assert_equal true, list.is_shared_with?(@shared_2)
  end

  test "shared_list_owner returns correct list owner" do
    setup_shared_lists!

    assert_equal 2, SharedList.count

    list = List.last
    results = @owner.first_name + " " + @owner.last_name
    assert_equal results, list.shared_list_owner
  end

  test "number_shared_with returns correct number of users list is shared with" do
    setup_shared_lists!

    assert_equal 2, SharedList.count

    list = List.last
    assert_equal 2, list.number_shared_with
  end
end
