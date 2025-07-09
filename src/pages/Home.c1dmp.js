import wixData from 'wix-data';

let selectedMentorId = null;

$w.onReady(function () {
    $w('#dataset1').onReady(() => {
        selectFirstMentor();
    });

    $w('#input1').onInput((event) => {
        performSearch(event.target.value.trim());
    });

    $w('#repeater1').onItemReady(($item, itemData, index) => {
        $item('#box182').style.backgroundColor = 'white';

        $item('#box182').onClick(() => {
            selectedMentorId = itemData._id;

            $w('#repeater1').forEachItem(($innerItem, innerItemData) => {
                $innerItem('#box182').style.backgroundColor = 'white';
            });

            $item('#box182').style.backgroundColor = '#7f5af0';
            showMentorDetails(itemData);
        });
    });
});

function performSearch(searchValue) {
    const baseFilter = searchValue
        ? wixData.filter().contains("name", searchValue)
        : wixData.filter();

    $w('#dataset1').setFilter(baseFilter)
        .then(() => $w('#dataset1').getItems(0, 100))
        .then(result => {
            const items = result.items;

            // Custom sorting: exact startsWith first, then contains
            const sorted = items.sort((a, b) => {
                const aName = a.name.toLowerCase();
                const bName = b.name.toLowerCase();
                const term = searchValue.toLowerCase();

                const aStarts = aName.startsWith(term);
                const bStarts = bName.startsWith(term);

                if (aStarts && !bStarts) return -1;
                if (!aStarts && bStarts) return 1;

                const aContains = aName.includes(term);
                const bContains = bName.includes(term);

                if (aContains && !bContains) return -1;
                if (!aContains && bContains) return 1;

                return 0;
            });

            // Reset the dataset with sorted items with priority by nishad
            $w('#dataset1').setItems(sorted)
                .then(() => {
                    // Highlight first
                    $w('#repeater1').forEachItem(($item, itemData, index) => {
                        if (index === 0) {
                            selectedMentorId = itemData._id;
                            $item('#box182').style.backgroundColor = '#7f5af0';
                            showMentorDetails(itemData);
                        } else {
                            $item('#box182').style.backgroundColor = 'white';
                        }
                    });
                });
        });
}

function showMentorDetails(itemData) {
    $w('#text110').text = itemData.name;
    $w('#text109').text = itemData.designation;
    $w('#text108').text = itemData.description || '';
    $w('#text106').text = itemData.bio || '';
    $w('#text102').text = itemData.availability || '';
    $w('#text104').text = itemData["Who Should Reach"] || '';
    $w('#imageX13').src = itemData.image;
}

function selectFirstMentor() {
    $w('#repeater1').forEachItem(($item, itemData, index) => {
        if (index === 0) {
            $item('#box182').style.backgroundColor = '#7f5af0';
            showMentorDetails(itemData);
        } else {
            $item('#box182').style.backgroundColor = 'white';
        }
    });
}
