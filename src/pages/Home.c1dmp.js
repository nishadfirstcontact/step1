import wixData from 'wix-data';

let selectedMentorId = null;

$w.onReady(function () {

    // Perform live search on text input
    $w('#input1').onInput(() => {
        performSearch();
    });

    // Search button (optional)
    $w('#vectorImage17').onClick(() => {
        performSearch();
    });

    // Set up click events for repeater items
    $w('#repeater1').onItemReady(($item, itemData, index) => {

        // Set default background
        $item('#box182').style.backgroundColor = 'white';

        // On click, highlight and show details
        $item('#box182').onClick(() => {
            selectedMentorId = itemData._id;

            // Reset all backgrounds
            $w('#repeater1').forEachItem(($innerItem, innerItemData) => {
                $innerItem('#box182').style.backgroundColor = 'white';
            });

            // Highlight selected item
            $item('#box182').style.backgroundColor = '#7f5af0';

            // Show details on the right
            showMentorDetails(itemData);
        });
    });
});

function performSearch() {
    const searchValue = $w('#input1').value.trim().toLowerCase();

    if (searchValue === '') {
        $w('#dataset1').setFilter(wixData.filter());
        return;
    }

    $w('#dataset1').setFilter(wixData.filter().contains('name', searchValue))
        .then(() => {
            let found = false;

            $w('#repeater1').forEachItem(($item, itemData) => {
                const name = itemData.name ? itemData.name.toLowerCase() : '';
                if (!found && name.includes(searchValue)) {
                    // Reset all
                    $w('#repeater1').forEachItem(($innerItem, innerItemData) => {
                        $innerItem('#box182').style.backgroundColor = 'white';
                    });

                    // Highlight match
                    $item('#box182').style.backgroundColor = '#7f5af0';

                    // Show details
                    showMentorDetails(itemData);

                    // Scroll to top
                    $w('#repeater1').scrollTo().catch(console.error);

                    found = true;
                }
            });
        });
}

function showMentorDetails(itemData) {
    $w('#text110').text = itemData.name || '';
    $w('#text109').text = itemData.designation || '';
    $w('#text108').text = itemData.description || '';
    $w('#text106').text = itemData.bio || '';
    $w('#text102').text = itemData.availability || '';
    $w('#text104').text = itemData["Who Should Reach"] || ''; // Column name from collection nishad
    $w('#imageX13').src = itemData.image || '';
}
