require "test_helper"

class ListTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

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
    user = User.create(username: "Person", uid: "31415", provider: "lols")
    list = List.create(user: user, name: "Shopping Place")
    list.items.create(
      name: "Item 1",
      person: "Person 1",
      department: "Department 1"
    )
    list.items.create(
      name: "Item 2",
      person: "Person 2",
      department: "Department 2"
    )
    assert_equal(
      {
        "id"=>980190963,
        "user_id"=>list.user_id,
        "name"=>"Shopping Place",
        "created_at"=>list.created_at.strftime('%Y-%m-%dT%H:%M:%S.%LZ'),
        "updated_at"=>list.updated_at.strftime('%Y-%m-%dT%H:%M:%S.%LZ'),
      },
      list.as_json
    )
  end
end
