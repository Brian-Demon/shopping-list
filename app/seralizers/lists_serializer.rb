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
        is_shared_with_user: list.is_shared_with?(@user),
        shared_list_owner: list.shared_list_owner,
        number_shared_with: list.number_shared_with
      })
    end
  end
end