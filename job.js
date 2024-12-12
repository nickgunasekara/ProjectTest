// Description: JavaScript for the view job page.
// This script formats the job posting time in a human-readable "time ago" format (e.g., "2 hours ago", "3 days ago").

// Helper function to convert a datetime string into a "time ago" format
function timeElapsedString(datetime) {
    // Get the current time (now)
    const now = new Date();
    
    // Convert the provided datetime string into a JavaScript Date object
    const past = new Date(datetime);
    
    // Calculate the difference in seconds between now and the datetime provided
    const diffInSeconds = Math.floor((now - past) / 1000); // Convert milliseconds to seconds

    // Define the time intervals in seconds for various units (year, month, day, hour, minute, second)
    const timeIntervals = {
        year: 31536000,  // 60 * 60 * 24 * 365 seconds in a year
        month: 2592000,  // 60 * 60 * 24 * 30 seconds in a month
        day: 86400,      // 60 * 60 * 24 seconds in a day
        hour: 3600,      // 60 * 60 seconds in an hour
        minute: 60,      // 60 seconds in a minute
        second: 1        // 1 second
    };

    // Variable to store the final "time ago" message
    let timeAgo = '';

    // Loop through the timeIntervals object to find the first time unit that fits the difference
    for (const [key, seconds] of Object.entries(timeIntervals)) {
        // Divide the difference in seconds by the current interval (year, month, day, etc.)
        const time = Math.floor(diffInSeconds / seconds);

        // If the time is 1 or greater, use this unit for the "time ago" string
        if (time >= 1) {
            // Create the time-ago string, adding "s" to the unit if the time is plural (e.g., "2 days ago")
            timeAgo = ${time} ${key}${time > 1 ? 's' : ''} ago;
            break; // Break out of the loop as soon as the first unit is found
        }
    }

    // If no time difference was found (i.e., the job was just posted), return "just now"
    return timeAgo || 'just now';
}

// This part listens for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Select the element that contains the datetime for when the job was posted
    const postedTimeElement = document.querySelector('.JB_posted-time');
    
    // Retrieve the datetime value stored in the data-datetime attribute of the selected element
    const postedTime = postedTimeElement.getAttribute('data-datetime');

    // Call the timeElapsedString function to get the "time ago" format from the posted time
    const timeAgo = timeElapsedString(postedTime);

    // Update the text content of the element to show the "time ago" format (e.g., "Posted 3 days ago")
    postedTimeElement.textContent = Posted ${timeAgo};
});