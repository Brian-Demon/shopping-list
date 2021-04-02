module ItemsHelper
  def item_has_error_for?(item, column_name)
    item && item.errors && item.errors.include?(column_name)
  end

  def item_validation_class(item, column_name)
    if item_has_error_for?(item, column_name)
      "is-invalid"
    else
      ""
    end
  end
end
