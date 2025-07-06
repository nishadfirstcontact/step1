import wixData from 'wix-data';

let selectedMentorId = null;

$w.onReady(function () {

    // Live Search Functionality
    $w('#text1').onInput(() => {
        let searchValue = $w('#text1').value;

        if (searchValue === '') {
            // If search box is empty, show all items
            $w('#dataset1').setFilter(wixData.filter());
        } else {
            // Filter the dataset based on Name field
            $w('#dataset1').setFilter(wixData.filter()
                .contains('name', searchValue)
            );
        }
    });

    // Handle Click on Repeater Items
    $w('#repeater1').onItemReady(($item, itemData, index) => {

        // Reset box color initially
        $item('#box150').style.backgroundColor = 'white';

        // Click event to select mentor
        $item('#box150').onClick(() => {
            selectedMentorId = itemData._id;

            // Reset all boxes to white
            $w('#repeater1').forEachItem(($innerItem, innerItemData) => {
                $innerItem('#box150').style.backgroundColor = 'white';
            });

            // Highlight the selected box in dark purple
            $item('#box150').style.backgroundColor = '#7f5af0'; // dark purple

            // Show details in the right side big box
            $w('#box187').text = itemData.name; // Mentor Name
            $w('#box189').src = itemData.image; // Mentor Image
            $w('#text108').text = itemData.description; // Mentor Description
        });
    });
});
