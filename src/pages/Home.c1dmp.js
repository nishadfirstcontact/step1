import wixData from 'wix-data';

let selectedMentorId = null;

$w.onReady(function () {
    console.log("nishad");

    // Search input listener
    $w('#input1').onInput((event) => {
        performSearch(event.target.value.trim());
    });

    // Repeater item ready
    $w('#repeater1').onItemReady(($item, itemData) => {
        $item('#imageX13').src = itemData.photo;
        $item('#text132').text = itemData.name;
        $item('#text131').text = itemData.currentPosition;

        $item('#box182').style.backgroundColor = 'white';

        $item('#box182').onClick(() => {
            selectedMentorId = itemData._id;

            $w('#repeater1').forEachItem(($innerItem) => {
                $innerItem('#box182').style.backgroundColor = 'white';
            });

            $item('#box182').style.backgroundColor = '#7f5af0';
            showMentorDetails(itemData);
        });
    });

    loadAllMentors();

    // ✅ Apply overflow behavior without using document/head
    $w('#box264').style.overflowY = "auto";
});

function loadAllMentors() {
    wixData.query("Finance Mentors")
        .find()
        .then((results) => {
            if (results.items.length > 0) {
                $w('#repeater1').data = results.items;
                showMentorDetails(results.items[0]);
                highlightFirstItem(results.items[0]._id);
            }
        });
}

function performSearch(searchValue) {
    wixData.query("Finance Mentors")
        .find()
        .then((results) => {
            const allMentors = results.items;

            if (!searchValue) {
                $w('#repeater1').data = allMentors;
                showMentorDetails(allMentors[0]);
                highlightFirstItem(allMentors[0]._id);
                return;
            }

            const matching = allMentors.filter(m =>
                m.name.toLowerCase().includes(searchValue.toLowerCase())
            );

            const rest = allMentors.filter(m =>
                !m.name.toLowerCase().includes(searchValue.toLowerCase())
            );

            const sorted = [...matching, ...rest];
            $w('#repeater1').data = sorted;

            if (matching.length > 0) {
                showMentorDetails(matching[0]);
                highlightFirstItem(matching[0]._id);
            }
        });
}

function showMentorDetails(itemData) {
    // Desktop View
    $w('#imageX7').src = itemData.photo;
    $w('#text128').text = itemData.name;
    $w('#text129').text = itemData.currentPosition;
    $w('#text110').text = itemData.areaOfExpertise;
    $w('#text112').text = itemData.bio;
    $w('#text114').text = itemData.whoShouldReach;
    $w('#text116').text = itemData.availability;

    if (itemData.linkedinProfile) $w('#button17').link = itemData.linkedinProfile;
    if (itemData.email) $w('#button18').link = `mailto:${itemData.email}`;

    // Mobile View
    $w('#imageX16').src = itemData.photo;
    $w('#text158').text = itemData.name;
    $w('#text157').text = itemData.currentPosition;
    $w('#text159').text = itemData.areaOfExpertise;
    $w('#text163').text = itemData.bio;
    $w('#text161').text = itemData.whoShouldReach;
    $w('#text169').text = itemData.availability;

    if (itemData.linkedinProfile) $w('#button26').link = itemData.linkedinProfile;
    if (itemData.email) $w('#button25').link = `mailto:${itemData.email}`;
}

function highlightFirstItem(id) {
    $w('#repeater1').forEachItem(($item, itemData) => {
        $item('#box182').style.backgroundColor = itemData._id === id ? '#7f5af0' : 'white';
    });
}
