import wixData from 'wix-data';

let selectedMentorId = null;

$w.onReady(function () {

    // Search Button Click
    $w('#vectorImage17').onClick(() => {
        performSearch();
    });

    // Search on Enter Key Press
    $w('#input1').onKeyPress((event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    // Repeater Item Click to Show Details
    $w('#repeater1').onItemReady(($item, itemData, index) => {

        // Reset color initially
        $item('#box182').style.backgroundColor = 'white';

        // Click event
        $item('#box182').onClick(() => {
            selectedMentorId = itemData._id;

            // Reset all boxes to white
            $w('#repeater1').forEachItem(($innerItem, innerItemData) => {
                $innerItem('#box182').style.backgroundColor = 'white';
            });

            // Highlight selected box
            $item('#box182').style.backgroundColor = '#7f5af0'; // Highlight color

            // Show mentor details on the right
            showMentorDetails(itemData);
        });
    });
});

function performSearch() {
    let searchValue = $w('#input1').value.trim();

    if (searchValue === '') {
        // Show all mentors if input is empty
        $w('#dataset1').setFilter(wixData.filter());
        return;
    }

    // Search and filter mentors
    $w('#dataset1').setFilter(wixData.filter().contains('name', searchValue))
        .then(() => {
            $w('#repeater1').forEachItem(($item, itemData) => {
                if (itemData.name.toLowerCase().includes(searchValue.toLowerCase())) {

                    // Reset all backgrounds
                    $w('#repeater1').forEachItem(($innerItem, innerItemData) => {
                        $innerItem('#box182').style.backgroundColor = 'white';
                    });

                    // Highlight matching item
                    $item('#box182').style.backgroundColor = '#7f5af0';

                    // Show details
                    showMentorDetails(itemData);

                    // Scroll to top
                    $w('#repeater1').scrollTo()
                        .catch((err) => { console.error(err); });

                    return; // Exit after first match
                }
            });
        });
}

function showMentorDetails(itemData) {
    $w('#text110').text = itemData.name;                 // Mentor Name
    $w('#text109').text = itemData.designation;          // Mentor Designation
    $w('#text108').text = itemData.description;          // Mentor Description
    $w('#text106').text = itemData.bio;                  // Mentor Bio
    $w('#text102').text = itemData.availability;         // Mentor Availability
    $w('#text104').text = itemData.whoShouldReachOutToYou; // Who Should Reach Out
    $w('#imageX13').src = itemData.image;                // Mentor Image
}
