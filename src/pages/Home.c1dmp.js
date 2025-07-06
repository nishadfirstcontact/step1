import wixData from 'wix-data';

$w.onReady(function () {

    $w('#text1').onInput(() => {
        let searchValue = $w('#text1').value.trim().toLowerCase();

        // Reset all boxes to white
        $w('#repeater1').forEachItem(($item, itemData) => {
            $item('#box182').style.backgroundColor = 'white';
        });

        if (searchValue === '') {
            // If search is empty, do nothing
            return;
        }

        let found = false;

        // Search and highlight the matching mentor
        $w('#repeater1').forEachItem(($item, itemData) => {
            if (itemData.name.toLowerCase().includes(searchValue)) {

                // Highlight the matched box
                $item('#box182').style.backgroundColor = '#7f5af0'; // Dark Purple

                // Show mentor details in the right side big box
                $w('#box188').text = itemData.name;          // Mentor Name
                $w('#box189').src = itemData.image;          // Mentor Image
                $w('#text108').text = itemData.description;  // Mentor Description

                found = true;
                return; // Stop at the first match
            }
        });

        if (!found) {
            // Optional: Clear detail box if no match found nishad
            $w('#box188').text = '';
            $w('#box189').src = '';
            $w('#text108').text = '';
        }
    });
});
