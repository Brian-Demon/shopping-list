class ListsSerializer
  def initialize(lists, user)
    @lists = lists
    @user = user
  end

  def as_json(*)
    @lists.map do |list|
      list.as_json({
        only: [:id, :name],
        include: [:items]
      }).merge({
        unbought: list.items.unbought_and_active.count,
        item_count: list.items.active.count,
        active: list.items.active,
        shared: list.is_shared_with?(@user)
      })
    end
  end
end