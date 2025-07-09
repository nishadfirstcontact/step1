import wixData from 'wix-data';

let selectedMentorId = null;

$w.onReady(function () {

    // 🔍 Live search as user types
    $w('#input1').onInput(() => {
        performSearch();
    });

    // Optional: Also support click on search button
    $w('#vectorImage17').onClick(() => {
        performSearch();
    });

    // 🎯 Setup click behavior on repeater items
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

// 🔎 Perform filter based on input1
function performSearch() {
    const searchValue = $w('#input1').value.trim().toLowerCase();

    if (searchValue === '') {
        $w('#dataset1').setFilter(wixData.filter());
        return;
    }

    $w('#dataset1').setFilter(wixData.filter().contains('name', searchValue))
        .then(() => {
            let matched = false;

            $w('#repeater1').forEachItem(($item, itemData) => {
                if (!matched && itemData.name?.toLowerCase().includes(searchValue)) {
                    $w('#repeater1').forEachItem(($innerItem) => {
                        $innerItem('#box182').style.backgroundColor = 'white';
                    });

                    $item('#box182').style.backgroundColor = '#7f5af0';
                    showMentorDetails(itemData);
                    matched = true;
                    $w('#repeater1').scrollTo().catch(() => {});
                }
            });
        });
}

// 📦 Show selected mentor’s full details
function showMentorDetails(itemData) {
    $w('#text110').text = itemData.name || '';
    $w('#text109').text = itemData.designation || '';
    $w('#text108').text = itemData.description || '';
    $w('#text106').text = itemData.bio || '';
    $w('#text102').text = itemData.availability || '';
    $w('#text104').text = itemData["Who Should Reach"] || '';  // If that is the exact column name h
    $w('#imageX13').src = itemData.image || '';
}
