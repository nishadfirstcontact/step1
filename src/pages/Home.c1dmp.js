import wixData from 'wix-data';

$w.onReady(function () {
    loadMentors();

    // Search function triggered when user types
    $w("#searchInput").onInput(() => {
        let searchValue = $w("#searchInput").value;
        loadMentors(searchValue);
    });
});

// Function to load mentors (optionally filtered)
function loadMentors(searchText = "") {
    let query = wixData.query('Mentors');

    if (searchText.trim() !== "") {
        query = query.contains('name', searchText);
    }

    query.find()
        .then((results) => {
            if (results.items.length > 0) {
                $w("#repeater1").data = results.items;
            } else {
                $w("#repeater1").data = [];
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

// When each repeater item is ready, bind the data
export function repeater1_itemReady($item, itemData, index) {
    $item("#nameText").text = itemData.name;
    $item("#designationText").text = itemData.designation;
    $item("#mentorImage").src = itemData.image;
}
