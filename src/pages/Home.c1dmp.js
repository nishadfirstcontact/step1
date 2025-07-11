import wixData from 'wix-data';

let selectedMentorId = null;

$w.onReady(function () {
    // Auto search as user types
    $w('#input1').onInput((event) => {
        performSearch(event.target.value.trim());
    });

    // Repeater onItemReady
    $w('#repeater1').onItemReady(($item, itemData, index) => {
        // Reset styles
        $item('#box182').style.backgroundColor = 'white';

        $item('#box182').onClick(() => {
            selectedMentorId = itemData._id;

            // Reset all backgrounds
            $w('#repeater1').forEachItem(($innerItem) => {
                $innerItem('#box182').style.backgroundColor = 'white';
            });

            // Highlight clicked
            $item('#box182').style.backgroundColor = '#7f5af0';

            // Show right panel
            showMentorDetails(itemData);
        });
    });

    // Load all initially and select first
    loadAllMentors();

    // Apply custom scroll styling to #box264 (scroll container)
    const style = document.createElement("style");
    style.innerHTML = `
        /* --- Option 1: HIDE scrollbar --- */
        #box264::-webkit-scrollbar {
            display: none;
        }
        #box264 {
            -ms-overflow-style: none;   /* IE and Edge */
            scrollbar-width: none;      /* Firefox */
            overflow-y: auto;           /* Enable scroll */
        }

        /* --- Option 2: VISIBLE styled scrollbar (comment above and uncomment below if needed) ---
        #box264::-webkit-scrollbar {
            width: 6px;
        }
        #box264::-webkit-scrollbar-thumb {
            background-color: #7f5af0;
            border-radius: 6px;
        }
        #box264 {
            scrollbar-width: thin;
            scrollbar-color: #7f5af0 transparent;
            overflow-y: auto;
        }
        */
    `;
    document.head.appendChild(style);
});

function loadAllMentors() {
    wixData.query("Mentors")
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
    wixData.query("Mentors")
        .find()
        .then((results) => {
            const allMentors = results.items;

            if (!searchValue) {
                $w('#repeater1').data = allMentors;
                showMentorDetails(allMentors[0]);
                highlightFirstItem(allMentors[0]._id);
                return;
            }

            // Prioritize matching mentors at top
            const matching = allMentors.filter(m =>
                m.name.toLowerCase().includes(searchValue.toLowerCase())
            );

            const rest = allMentors.filter(m =>
                !m.name.toLowerCase().includes(searchValue.toLowerCase())
            );

            const sorted = [...matching, ...rest]; // matching items first
            $w('#repeater1').data = sorted;

            // Show first match details
            if (matching.length > 0) {
                showMentorDetails(matching[0]);
                highlightFirstItem(matching[0]._id);
            }
        });
}

function showMentorDetails(itemData) {
    // Desktop View
    $w('#text110').text = itemData.name;
    $w('#text109').text = itemData.designation;
    $w('#text108').text = itemData.description;
    $w('#text106').text = itemData.bio;
    $w('#text102').text = itemData.availability;
    $w('#text104').text = itemData["Who Should Reach"];
    $w('#imageX13').src = itemData.image;

    // Mobile View
    $w('#text126').text = itemData.name;
    $w('#text125').text = itemData.designation;
    $w('#text124').text = itemData.description;
    $w('#text122').text = itemData.bio;
    $w('#text188').text = itemData.availability;
    $w('#imageX17').src = itemData.image;
}

function highlightFirstItem(id) {
    $w('#repeater1').forEachItem(($item, itemData) => {
        if (itemData._id === id) {
            $item('#box182').style.backgroundColor = '#7f5af0';
        } else {
            $item('#box182').style.backgroundColor = 'white';
        }
    });
}
