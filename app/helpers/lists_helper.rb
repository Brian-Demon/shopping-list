module ListsHelper
  def list_item list, active = false
    active_class = active ? "active" : ""
    options = {
      class: "list-group-item list-group-item-action d-flex justify-content-between align-items-start #{active_class}",
      id: "list-#{list.id}-list", 
      "data-bs-toggle" => "list", 
      role: "tab", 
      "aria-controls" => list.id 
    }
    link_to("#list-#{list.id}", options) do
      if is_shared_list?(list, current_user)
        list_name = content_tag :div, list.name + " (shared)", class: "me-auto list-name"
      else
        list_name = content_tag :div, list.name, class: "me-auto list-name"
      end
      item_count = content_tag :span, list.items.active.count, class: "badge bg-primary rounded-pill item-count"

      list_name + item_count
    end
  end

  def is_shared_list?(list, user)
    if SharedList.find_by(list_id: list.id)
      true
    else
      false
    end
  end

  def shared_list_reference(shared_list)
    List.find_by(id: shared_list.list_id)
  end
end