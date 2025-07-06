import wixData from 'wix-data';

$w.onReady(function () {
    // Click event on search button
    $w('#vectorImage17').onClick(() => {
        let searchValue = $w('#text1').value.trim().toLowerCase();

        // Apply dataset filter
        if (searchValue === '') {
            // Show all mentors if search box is empty
            $w('#dataset1').setFilter(wixData.filter());
        } else {
            // Filter dataset by name
            $w('#dataset1').setFilter(wixData.filter()
                .contains('name', searchValue)
            );
        }
    });

    // When each item is loaded in the repeater
    $w('#repeater1').onItemReady(($item, itemData) => {
        // Click event on each box (optional manual selection)
        $item('#box182').onClick(() => {
            highlightItem($item, itemData);
        });
    });

    // When the dataset finishes loading after filter
    $w('#dataset1').onReady(() => {
        let searchValue = $w('#text1').value.trim().toLowerCase();

        if (searchValue === '') {
            return; // No highlight if input is empty
        }

        // Automatically highlight the first matching item
        $w('#repeater1').forEachItem(($item, itemData) => {
            if (itemData.name.toLowerCase().includes(searchValue)) {
                highlightItem($item, itemData);
                return false; // Stop after first match
            }
        });
    });

    // Function to highlight item and display details
    function highlightItem($item, itemData) {
        // Reset all boxes to white
        $w('#repeater1').forEachItem(($innerItem) => {
            $innerItem('#box182').style.backgroundColor = 'white';
        });

        // Highlight the selected item
        $item('#box182').style.backgroundColor = '#7f5af0'; // dark purple

        // Show mentor details in the right box hehe
        $w('#box188').text = itemData.name;
        $w('#box189').src = itemData.image;
        $w('#text108').text = itemData.description;
    }
});
