import wixData from 'wix-data';

let selectedMentorId = null;

$w.onReady(function () {
    $w('#dataset1').onReady(() => {
        selectFirstMentor();
    });

    // LIVE FILTERING ON INPUT
    $w('#input1').onInput((event) => {
        performSearch(event.target.value.trim());
    });

    // On Item Ready
    $w('#repeater1').onItemReady(($item, itemData, index) => {
        $item('#box182').style.backgroundColor = 'white';

        $item('#box182').onClick(() => {
            selectedMentorId = itemData._id;

            // Reset all styles
            $w('#repeater1').forEachItem(($innerItem, innerItemData) => {
                $innerItem('#box182').style.backgroundColor = 'white';
            });

            // Highlight selected
            $item('#box182').style.backgroundColor = '#7f5af0';

            // Show mentor details
            showMentorDetails(itemData);

            // Move clicked item to top
            moveMentorToTop(itemData._id);
        });
    });
});

// FILTER FUNCTION
function performSearch(searchValue) {
    const filter = searchValue
        ? wixData.filter().contains("name", searchValue)
        : wixData.filter();

    $w('#dataset1').setFilter(filter)
        .then(() => {
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
}

// SHOW MENTOR DETAILS
function showMentorDetails(itemData) {
    $w('#text110').text = itemData.name;
    $w('#text109').text = itemData.designation;
    $w('#text108').text = itemData.description || '';
    $w('#text106').text = itemData.bio || '';
    $w('#text102').text = itemData.availability || '';
    $w('#text104').text = itemData["Who Should Reach"] || '';
    $w('#imageX13').src = itemData.image;
}

// AUTO SELECT FIRST ON LOAD
function selectFirstMentor() {
    const items = $w('#dataset1').getCurrentItem();
    $w('#repeater1').forEachItem(($item, itemData, index) => {
        if (index === 0) {
            $item('#box182').style.backgroundColor = '#7f5af0';
            showMentorDetails(itemData);
        } else {
            $item('#box182').style.backgroundColor = 'white';
        }
    });
}

// MOVE SELECTED TO TOP Nishad
function moveMentorToTop(idToMove) {
    $w('#dataset1').getItems(0, 100)
        .then(result => {
            let items = result.items;
            const index = items.findIndex(item => item._id === idToMove);
            if (index > -1) {
                const [selected] = items.splice(index, 1);
                items.unshift(selected);
                $w('#dataset1').setItems(items);
            }
        });
}
