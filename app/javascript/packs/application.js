// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import * as bootstrap from "bootstrap"

Rails.start()
Turbolinks.start()
ActiveStorage.start()


window.addEventListener("load", () => {
  const elements = document.querySelectorAll(".list-item-bought-toggle");
    elements.forEach((element) => {
        element.addEventListener("ajax:success", (event) => {
            const [_data, _status, xhr] = event.detail;
            let row = element.closest("tr");
            if (element.checked) {
                row.classList.add("item-bought");
            } else {
                row.classList.remove("item-bought");
            }
        });
        element.addEventListener("ajax:error", (event) => {
            const [_data, _status, xhr] = event.detail;
//             alert("ERROR - " + JSON.parse(xhr.responseText)["message"]);
        });
    })

    // Manually binds any Bootstrap popover components
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })
});
// Support component names relative to this directory:
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
