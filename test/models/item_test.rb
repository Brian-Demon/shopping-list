require "test_helper"

class ItemTest < ActiveSupport::TestCase
  test "valid item can not have quantity less than zero" do
    list = List.new(name: "Shopping Place")
    item = Item.new(name: "Bananas", person: "Me", department: "Produce", quantity: -1, list: list)
    refute item.valid?
    assert_includes item.errors[:quantity], "must be greater than or equal to 0"
  end
end
