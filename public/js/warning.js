// Function to display a warning message when the user tries to leave the page
function showUnloadWarning(event) {
    // Standard for most browsers
    var message = "Are you sure you want to leave? Your data may not be saved.";

    // For older versions of Internet Explorer
    if (typeof event === 'undefined') {
        event = window.event;
    }

    // Set the message in Internet Explorer
    if (event) {
        event.returnValue = message;
    }

    // Standard for most browsers
    return message;
}

// Attach the event listener to the beforeunload event
window.addEventListener('beforeunload', showUnloadWarning);
