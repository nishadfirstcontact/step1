import wixData from 'wix-data';

$w.onReady(function () {

    // Search button click event
    $w('#vectorImage17').onClick(() => {
        let searchValue = $w('#input1').value.trim().toLowerCase();

        if (searchValue === '') {
            $w('#dataset1').setFilter(wixData.filter());
        } else {
            $w('#dataset1').setFilter(wixData.filter()
                .contains('name', searchValue)
                .or(wixData.filter().contains('designation', searchValue))
            );
        }
    });

    // Repeater item ready
    $w('#repeater1').onItemReady(($item, itemData) => {

        // Reset background initially
        $item('#box182').style.backgroundColor = 'white';

        // Click event for each item
        $item('#box182').onClick(() => {
            highlightItem($item, itemData);
        });
    });

    // When dataset refreshes after search
    $w('#dataset1').onReady(() => {
        let searchValue = $w('#text1').value.trim().toLowerCase();

        if (searchValue === '') {
            return;
        }

        // Auto highlight first match
        $w('#repeater1').forEachItem(($item, itemData) => {
            if (itemData.name.toLowerCase().includes(searchValue) || itemData.designation.toLowerCase().includes(searchValue)) {
                highlightItem($item, itemData);
                return false; // stop after first match
            }
        });
    });

    // Highlight function
    function highlightItem($item, itemData) {
        $w('#repeater1').forEachItem(($innerItem) => {
            $innerItem('#box182').style.backgroundColor = 'white';
        });

        $item('#box182').style.backgroundColor = '#7f5af0';

        // Update right side details
        $w('#text110').text = itemData.name;
        $w('#text109').text = itemData.designation;
        $w('#text108').text = itemData.description;
        $w('#box189').src = itemData.image;
    }
});
