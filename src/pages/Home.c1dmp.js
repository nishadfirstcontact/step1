import wixData from 'wix-data';

let selectedMentorId = null;

$w.onReady(function () {

    // Live Search Functionality
    $w('#text1').onInput(() => {
        let searchValue = $w('#text1').value;

        if (searchValue === '') {
            // Show all mentors when input is empty
            $w('#dataset1').setFilter(wixData.filter());
        } else {
            // Filter mentors by name
            $w('#dataset1').setFilter(wixData.filter()
                .contains('name', searchValue)
            );
        }
    });

    // Handle Click on Repeater Items
    $w('#repeater1').onItemReady(($item, itemData, index) => {

        // Reset background color initially
        $item('#box182').style.backgroundColor = 'white';

        // Click event for each mentor box
        $item('#box182').onClick(() => {
            selectedMentorId = itemData._id;

            // Reset all boxes to white
            $w('#repeater1').forEachItem(($innerItem, innerItemData) => {
                $innerItem('#box182').style.backgroundColor = 'white';
            });

            // Highlight selected box
            $item('#box182').style.backgroundColor = '#7f5af0'; // dark purple

            // Show mentor details in the right box
            $w('#box187').text = itemData.name;          // Mentor Name
            $w('#box189').src = itemData.image;          // Mentor Image
            $w('#text108').text = itemData.description;  // Mentor Description
        });
    });
});
