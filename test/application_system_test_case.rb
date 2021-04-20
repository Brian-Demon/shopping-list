require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :headless_chrome, screen_size: [1600, 1080], options: {
    url: "http://localhost:4444/wd/hub",
    desired_capabilities: Selenium::WebDriver::Remote::Capabilities.chrome(
      chromeOptions: { args: %w[headless window-size=1600x1080 no-sandbox disable-dev-shm-usage] },
    )
  }

  def setup
    Capybara.server_host = "0.0.0.0"
    Capybara.server = :puma, { Threads: "1:1" }
    Capybara.app_host = "http://host.docker.internal:#{Capybara.current_session.server.port}"
    super
  end

  def login!
    visit root_path
    within(".call-to-action") do
      click_on "Login with Google"
    end
  end
end
