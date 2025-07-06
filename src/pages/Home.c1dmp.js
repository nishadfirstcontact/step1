import wixData from 'wix-data';

let selectedMentorId = null;

$w.onReady(function () {

    $w('#text1').onInput(() => {
        let searchValue = $w('#text1').value.trim().toLowerCase();

        // Reset all box colors first
        $w('#repeater1').forEachItem(($item, itemData) => {
            $item('#box182').style.backgroundColor = 'white';
        });

        if (searchValue === '') {
            // If input is empty, don't highlight anything
            return;
        }

        let found = false;

        // Search and highlight matching mentor
        $w('#repeater1').forEachItem(($item, itemData) => {
            if (itemData.name.toLowerCase().includes(searchValue)) {

                // Highlight the matched mentor box
                $item('#box182').style.backgroundColor = '#7f5af0';

                // Show mentor details in the right side box
                $w('#box187').text = itemData.name;          // Mentor Name
                $w('#box189').src = itemData.image;          // Mentor Image
                $w('#text108').text = itemData.description;  // Mentor Description

                found = true;
                return; // Highlight only the first match
            }
        });

        if (!found) {
            // If no match found, optionally clear details
            $w('#box187').text = '';
            $w('#box189').src = '';
            $w('#text108').text = '';
        }
    });

});
