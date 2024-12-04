document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Funkcja do ustawiania motywu
    const setTheme = (isDark) => {
        if (isDark) {
            document.body.classList.add('dark-mode');
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            themeIcon.textContent = '🌞';
            localStorage.setItem('theme', 'light');
        }
    };

    // Detekcja preferencji użytkownika (automatyczny motyw)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        setTheme(savedTheme === 'dark');
    } else {
        setTheme(prefersDark.matches);
    }

    prefersDark.addEventListener('change', (e) => setTheme(e.matches));

    // Obsługa przycisku zmiany motywu
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        setTheme(!isDark);
    });
});
document.getElementById('calculate-button').addEventListener('click', function () {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    const resultDiv = document.getElementById('result');

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        resultDiv.innerHTML = 'Proszę podać poprawne liczby.';
        return;
    }

    if (a === 0) {
        resultDiv.innerHTML = 'To nie jest funkcja kwadratowa (a musi być różne od 0).';
        return;
    }

    const discriminant = b * b - 4 * a * c;
    if (discriminant > 0) {
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        resultDiv.innerHTML = `Dwa miejsca zerowe: x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`;
    } else if (discriminant === 0) {
        const x = -b / (2 * a);
        resultDiv.innerHTML = `Jedno miejsce zerowe: x = ${x.toFixed(2)}`;
    } else {
        resultDiv.innerHTML = 'Brak miejsc zerowych (delta < 0).';
    }
});

document.getElementById('plot-button').addEventListener('click', function () {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        alert('Proszę podać poprawne liczby.');
        return;
    }

    const modal = document.getElementById('plot-modal');
    const canvas = document.getElementById('plot');
    const ctx = canvas.getContext('2d');

    // Show the modal
    modal.style.display = 'flex';

    // Generate the data for the plot
    const xValues = [];
    const yValues = [];
    for (let x = -10; x <= 10; x += 0.1) {
        xValues.push(x);
        yValues.push(a * x * x + b * x + c);
    }

    // Clear existing chart if any
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Create a new chart
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                label: 'f(x) = ax² + bx + c',
                data: yValues,
                borderColor: '#007BFF',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                zoom: {
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true,
                        },
                        mode: 'x',
                    }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'x' }
                },
                y: {
                    title: { display: true, text: 'f(x)' }
                }
            }
        }
    });
});

// Close the modal
document.getElementById('close-modal').addEventListener('click', function () {
    const modal = document.getElementById('plot-modal');
    modal.style.display = 'none';
});