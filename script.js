document.getElementById('angle-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Hide previous results and errors
    document.getElementById('results').classList.add('hidden');
    document.getElementById('error-message').classList.add('hidden');

    // Get input values
    const D_u = parseFloat(document.getElementById('distance-to-monitors').value);
    const D_m = parseFloat(document.getElementById('distance-between-monitors').value);

    // Validate inputs
    if (isNaN(D_u) || isNaN(D_m) || D_u <= 0 || D_m <= 0) {
        showError('Please enter valid positive numbers for both distances.');
        return;
    }

    // Check if D_u is sufficient to form a triangle
    if (D_m / 2 > D_u) {
        showError('The distance to the monitors must be greater than half the distance between the monitors.');
        return;
    }

    const cosThetaH = (D_m) / (2.0 * D_u)
    const thetaH = (Math.atan(cosThetaH) * (180 / Math.PI)) * 2.0;

    // Calculate recommended monitor angle
    const monitorAngle = (180 - thetaH) / 2;

    // Display results
    document.getElementById('theta-h').textContent = thetaH.toFixed(2);
    document.getElementById('monitor-angle').textContent = monitorAngle.toFixed(2);

    document.getElementById('results').classList.remove('hidden');
});

// Event listener for the Render Explanation button
document.getElementById('render-markdown').addEventListener('click', function (e) {
    e.preventDefault();

    // Hide previous error messages
    document.getElementById('error-message').classList.add('hidden');

    // Get the title and markdown text
    const title = document.getElementById('markdown-title').value.trim();
    const markdownText = document.getElementById('markdown-text').value.trim();

    // Validate inputs
    if (!title || !markdownText) {
        showError('Please provide both a title and explanation in Markdown.');
        return;
    }

    // Convert Markdown to HTML using Marked.js
    const htmlContent = marked.parse(markdownText);

    // Inject the content into the display div
    const displayDiv = document.getElementById('markdown-display');
    displayDiv.innerHTML = `<h3>${title}</h3>${htmlContent}`;
    displayDiv.classList.remove('hidden');

    // Scroll to the rendered content
    displayDiv.scrollIntoView({ behavior: 'smooth' });
});

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}
