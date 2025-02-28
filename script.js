// Check for saved user preference, if any
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

// Function to set a theme
function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (document.getElementById('checkbox')) {
            document.getElementById('checkbox').checked = true;
        }
        if (document.getElementById('theme-toggle')) {
            document.getElementById('theme-toggle').checked = true;
        }
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if (document.getElementById('checkbox')) {
            document.getElementById('checkbox').checked = false;
        }
        if (document.getElementById('theme-toggle')) {
            document.getElementById('theme-toggle').checked = false;
        }
    }
}

// Apply saved theme on load
if (currentTheme) {
    setTheme(currentTheme);
} else {
    // If no saved preference, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

// Listen for toggle changes
document.addEventListener('DOMContentLoaded', function() {
    // Original toggle (if exists)
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function(e) {
            if (e.target.checked) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        });
    }
    
    // Sidebar toggle (if exists)
    const sidebarToggle = document.getElementById('theme-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('change', function() {
            if (this.checked) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        });
    }
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newTheme = e.matches ? 'dark' : 'light';
    // Only change theme if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
        setTheme(newTheme);
    }
});