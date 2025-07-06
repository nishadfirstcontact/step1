import wixData from 'wix-data';

$w.onReady(function () {
    $w('#text1').onInput(() => {
        let searchValue = $w('#text1').value.trim().toLowerCase();

        // Apply dataset filter
        if (searchValue === '') {
            // Show all mentors when input is empty
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

        // Click event for manual selection (optional)
        $item('#box182').onClick(() => {
            highlightItem($item, itemData);
        });
    });

    // Watch for dataset changes (when search happens)
    $w('#dataset1').onReady(() => {
        let searchValue = $w('#text1').value.trim().toLowerCase();

        if (searchValue === '') {
            return; // No need to highlight anything if input is empty
        }

        // Automatically highlight the first match after filtering
        $w('#repeater1').forEachItem(($item, itemData) => {
            if (itemData.name.toLowerCase().includes(searchValue)) {
                highlightItem($item, itemData);
                return false; // stop after first match
            }
        });
    });

    // Function to highlight and update right-side details
    function highlightItem($item, itemData) {
        // Reset all boxes to white
        $w('#repeater1').forEachItem(($innerItem) => {
            $innerItem('#box182').style.backgroundColor = 'white';
        });

        // Highlight the selected item
        $item('#box182').style.backgroundColor = '#7f5af0';

        // Show mentor details on the right hello
        $w('#box188').text = itemData.name;
        $w('#box189').src = itemData.image;
        $w('#text108').text = itemData.description;
    }
});
