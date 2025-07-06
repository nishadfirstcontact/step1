import wixData from 'wix-data';

let selectedMentorId = null;

$w.onReady(function () {

    // Search Button Click
    $w('#vectorImage17').onClick(() => {
        let searchValue = $w('#input1').value.trim();

        if (searchValue === '') {
            $w('#dataset1').setFilter(wixData.filter());
        } else {
            // Filter and sort to bring matching mentor to top
            $w('#dataset1').setFilter(wixData.filter()
                .contains('name', searchValue)
            ).then(() => {
                $w('#dataset1').setSort(wixData.sort()
                    .ascending('name')
                );

                // Highlight Matching Mentor
                $w('#repeater1').forEachItem(($item, itemData) => {
                    if (itemData.name.toLowerCase().includes(searchValue.toLowerCase())) {
                        $item('#box182').style.backgroundColor = '#7f5af0';
                        // Show Details
                        showMentorDetails(itemData);
                    } else {
                        $item('#box182').style.backgroundColor = 'white';
                    }
                });
            });
        }
    });

    // Repeater Click Events
    $w('#repeater1').onItemReady(($item, itemData) => {

        $item('#box182').onClick(() => {
            selectedMentorId = itemData._id;

            // Reset all boxes
            $w('#repeater1').forEachItem(($innerItem, innerItemData) => {
                $innerItem('#box182').style.backgroundColor = 'white';
            });

            // Highlight selected box
            $item('#box182').style.backgroundColor = '#7f5af0';

            // Show mentor details
            showMentorDetails(itemData);
        });
    });
});

// Display mentor details in the right side box
function showMentorDetails(itemData) {
    $w('#box188').text = itemData.name;         // Mentor Name
    $w('#box189').src = itemData.image;         // Mentor Image
    $w('#text108').text = itemData.description; // Description
    $w('#text110').text = itemData.designation; // Designation
    $w('#text106').text = itemData.bio;         // Bio
    $w('#text102').text = itemData.availability; // Availability
    $w('#text104').text = itemData['whoShouldRead']; // Who should reach out
}
