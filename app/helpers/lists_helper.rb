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
      list_name = content_tag :div, list.name, class: "me-auto list-name"
      item_count = content_tag :span, list.items.active.count, class: "badge bg-primary rounded-pill item-count"

      list_name + item_count
    end
  end
end