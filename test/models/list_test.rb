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
        "name"=>"Shopping Place",
        "items"=>[],
        :unbought_count=>0,
        :item_count=>0,
        :active=>list.items.active
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
        "id"=>list.id,
        "name"=>"Shopping Place",
        "items"=>[
          {
            "id"=>nil,
            "name"=>"Item 1",
            "person"=>"Person 1",
            "department"=>"Department 1",
            "bought"=>false,
            "quantity"=>nil
          },
          {
            "id"=>nil,
            "name"=>"Item 2",
            "person"=>"Person 2",
            "department"=>"Department 2",
            "bought"=>false,
            "quantity"=>nil
          }
        ],
        :unbought_count=>0,
        :item_count=>0,
        :active=>list.items.active
      },
      list.as_json
    )
  end
end
