document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("myButton");
    const output = document.getElementById("output");

    button.addEventListener("click", () => {
        output.textContent = "Button clicked! Welcome to my one-page website!";
    });

    // Sample data for search
    const searchData = ["test", "testing", "tester", "template", "temporary", "attempt", "contest", "detest", "protest", "context"];

    let selectedIndex = -1;

    // Search field with delayed dropdown
    $("#searchField").on("input", function () {
        let query = $(this).val().toLowerCase();
        if (query.length > 1) {
            setTimeout(function () {
                let results = searchData.filter((item) => item.includes(query));
                if (results.length > 0) {
                    $("#searchResults")
                        .html(results.map((item, index) => `<p class="search-item" data-index="${index}">${item}</p>`).join(""))
                        .show();
                    selectedIndex = -1;
                } else {
                    $("#searchResults").html("<p>No results found</p>").show();
                }
            }, 500);
        } else {
            $("#searchResults").hide();
        }
    });

    // Handle keyboard navigation
    $("#searchField").on("keydown", function (e) {
        let items = $("#searchResults .search-item");
        if (items.length > 0) {
            if (e.key === "ArrowDown") {
                selectedIndex = (selectedIndex + 1) % items.length;
                items.removeClass("selected");
                $(items[selectedIndex]).addClass("selected");
            } else if (e.key === "ArrowUp") {
                selectedIndex = (selectedIndex - 1 + items.length) % items.length;
                items.removeClass("selected");
                $(items[selectedIndex]).addClass("selected");
            } else if (e.key === "Enter") {
                if (selectedIndex >= 0) {
                    $("#searchField").val($(items[selectedIndex]).text());
                    $("#searchResults").hide();
                }
            }
        }
    });

    // Handle mouse click selection
    $(document).on("click", ".search-item", function () {
        $("#searchField").val($(this).text());
        $("#searchResults").hide();
    });

    // Handle tab out action
    $("#searchField").on("blur", function () {
        let items = $("#searchResults .search-item");
        if (items.length > 0) {
            if (selectedIndex === -1) {
                selectedIndex = 0;
            }
            $("#searchField").val($(items[selectedIndex]).text());
            $("#searchResults").hide();
        }
    });

    // Calendar field
    flatpickr("#calendarField", {});

    // Date and time fields
    flatpickr("#dateField", { dateFormat: "Y-m-d" });
    flatpickr("#timeField", { enableTime: true, noCalendar: true, dateFormat: "H:i" });

    // Login modal
    $("#loginButton").on("click", function () {
        let username = $("#username").val();
        let password = $("#password").val();
        if (username === "" || password === "") {
            $("#modalMessage").text("Invalid username or password");
            $("#loginModal").show();
        }
    });
    $(".close").on("click", function () {
        $("#loginModal").hide();
    });

    // Table with pagination
    let data = [];
    for (let i = 1; i <= 35; i++) {
        data.push({ id: i, name: "Name " + i, value: "Value " + i });
    }
    let currentPage = 1;
    let rowsPerPage = 10;

    function renderTable(page) {
        let start = (page - 1) * rowsPerPage;
        let end = start + rowsPerPage;
        let rows = data.slice(start, end);
        let tbody = $("#dataTable tbody");
        tbody.empty();
        rows.forEach((row) => {
            tbody.append("<tr><td>" + row.id + "</td><td>" + row.name + "</td><td>" + row.value + "</td></tr>");
        });
    }

    $("#prevPage").on("click", function () {
        if (currentPage > 1) {
            currentPage--;
            renderTable(currentPage);
        }
    });

    $("#nextPage").on("click", function () {
        if (currentPage < Math.ceil(data.length / rowsPerPage)) {
            currentPage++;
            renderTable(currentPage);
        }
    });

    renderTable(currentPage);
});
