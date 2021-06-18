require "test_helper"

class SharedListTest < ActiveSupport::TestCase
  test "a user can share a list with another user" do
    assert_difference "User.count", 2 do
      @user1 = User.create(
        email: "user1@gmail.com",
        username: "user1",
        uid: "1",
        provider: "google_oauth2",
      )
      @user2 = User.create(
        email: "user2@gmail.com",
        username: "user2",
        uid: "2",
        provider: "google_oauth2",
      )
    end

    @user1.lists.create(
      name: "user1_list",
      user_id: @user1.id,
    )
    assert_equal 1, @user1.lists.count
    assert_equal 0, @user2.lists.count

    assert_difference "SharedList.count", 1 do
      SharedList.create(
        user_id: @user2.id,
        list_id: List.last.id,
        active: true,
      )
    end

    assert_equal 1, @user1.lists.count
    assert_equal 1, @user2.shared_lists.count
    assert_equal "user1_list", List.find_by(id: @user2.shared_lists.last.list_id).name
  end
end
