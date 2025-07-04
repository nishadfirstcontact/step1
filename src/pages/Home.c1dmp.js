// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import wixData from 'wix-data';

$w.onReady(function () {
    loadMentors();
});

function loadMentors() {
    wixData.query('Mentors') // collection name
        .find()
        .then((results) => {
            if (results.items.length > 0) {
                let items = results.items;
                $w("#repeater1").data = items;
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

// When the repeater item is ready
export function repeater1_itemReady($item, itemData, index) {
    $item("#nameText").text = itemData.name; // connect to text inside the box
    $item("#designationText").text = itemData.designation;
    $item("#descriptionText").text = itemData.description;
    $item("#bioText").text = itemData.bio;
    $item("#availabilityText").text = itemData.availability;
    $item("#whoShouldText").text = itemData['whoShouldReachOutToYou'];
    $item("#mentorImage").src = itemData.image;
    $item("#linkedinButton").link = itemData['linkedinURL'];
    $item("#contactButton").link = itemData['contactURL'];
}
