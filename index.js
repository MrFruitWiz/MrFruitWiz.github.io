document.getElementById('spin-button').addEventListener('click', spin);

function spin() {
    const spinner = document.getElementById('spinner');
    const randomDegree = Math.floor(3600 + Math.random() * 360); // Spin multiple rotations
    spinner.style.transition = 'transform 4s ease-out';
    spinner.style.transform = `rotate(${randomDegree}deg)`;

    // Calculate result after the spin
    spinner.addEventListener('transitionend', () => {
        spinner.style.transition = 'none';
        const finalDegree = randomDegree % 360; // Normalize rotation to 0-360 degrees
        spinner.style.transform = `rotate(${finalDegree}deg)`;
        
        // Determine the segment based on the final angle
        const segment = Math.floor((finalDegree + 30) / 60) % 6 + 1;

        // Show result in a popup
        alert(`Congratulations! You got: ${segment}`);

    }, { once: true });
}
