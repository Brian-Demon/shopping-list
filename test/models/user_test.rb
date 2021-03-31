require "test_helper"

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "create_with_omniauth creates user when passed valid info" do
    auth = {
      "provider" => "google_oauth2",
      "uid" => "1",
      "info" => {
        "name" => "User"
      }
    }
    user = User.create_with_omniauth(auth)
    assert user.valid?
    assert_equal "google_oauth2", user.provider
    assert_equal "1", user.uid
    assert_equal "User", user.username
  end

  test "create_with_omniauth fails when provider is not present" do
    auth = {
      "provider" => nil,
      "uid" => "1",
      "info" => {
        "name" => "User"
      }
    }
    assert_raises ActiveRecord::RecordInvalid do
      User.create_with_omniauth(auth)
    end
  end

  test "create_with_omniauth fails when uid is not present" do
    auth = {
      "provider" => "google_oauth2",
      "uid" => nil,
      "info" => {
        "name" => "User"
      }
    }
    assert_raises ActiveRecord::RecordInvalid do
      User.create_with_omniauth(auth)
    end
  end

  test "create_with_omniauth fails when username is not present" do
    auth = {
      "provider" => "google_oauth2",
      "uid" => "1",
      "info" => {
        "name" => nil
      }
    }
    assert_raises ActiveRecord::RecordInvalid do
      User.create_with_omniauth(auth)
    end
  end

end
