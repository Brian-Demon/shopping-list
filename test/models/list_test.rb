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
end
