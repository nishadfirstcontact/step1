import wixData from 'wix-data';

let allMentors = [];

$w.onReady(function () {
    loadMentors();

    // Search event
    $w("#searchInput").onInput(() => {
        let searchValue = $w("#searchInput").value.trim();
        if (searchValue === "") {
            loadMentors();
        } else {
            searchMentors(searchValue);
        }
    });
});

// Load all mentors and display them in the boxes
function loadMentors() {
    wixData.query('Mentors')
        .find()
        .then((results) => {
            allMentors = results.items;
            displayMentors(allMentors);
        })
        .catch((err) => {
            console.log(err);
        });
}

// Search mentors by name
function searchMentors(searchValue) {
    let filteredMentors = allMentors.filter(mentor => mentor.name.toLowerCase().includes(searchValue.toLowerCase()));
    displayMentors(filteredMentors);
}

// Show mentors in your boxes
function displayMentors(mentors) {
    let boxIds = ["#box51", "#box50", "#box49", "#box48", "#box47", "#box46"];
    
    // First hide all boxes
    boxIds.forEach(boxId => {
        $w(boxId).collapse();
    });

    // Display mentors in the available boxes
    for (let i = 0; i < mentors.length && i < boxIds.length; i++) {
        let box = $w(boxIds[i]);
        let mentor = mentors[i];

        // Update box content - you need to have these elements inside each box
        box("#nameText").text = mentor.name;
        box("#designationText").text = mentor.designation;
        box("#mentorImage").src = mentor.image;

        box.expand();
    }
}
