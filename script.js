document.addEventListener("DOMContentLoaded", () => {
    console.log("Website Loaded Successfully! 🚀");

    // Animation on Scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('section, .chart-container');
        elements.forEach(element => {
            element.classList.add('fade-in');
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => observer.observe(element));
    };

    // Initialize animations
    animateOnScroll();

    // Chart Configuration
    Chart.defaults.color = "#fff";
    Chart.defaults.font.family = "'Poppins', sans-serif";
    Chart.defaults.font.size = 14;
    Chart.defaults.plugins.tooltip.backgroundColor = "rgba(0, 0, 0, 0.8)";
    Chart.defaults.plugins.legend.labels.padding = 20;

    // Chart Data
    const chartData = {
        categories: {
            labels: ["Chinese Cuisine", "Cutlet & Pakoda", "Maggi & Pasta", "Pav-Based Dishes", "Pizza"],
            data: [32, 28, 25, 18, 15]
        },
        chinese: {
            labels: ["Fried Rice", "Noodles", "Manchurian", "Spring Roll", "Chilli Paneer"],
            data: [35, 30, 20, 10, 5]
        },
        cutletPakoda: {
            labels: ["Veg Cutlet", "Paneer Pakoda", "Chicken Cutlet", "Mix Veg Pakoda", "Aloo Pakoda"],
            data: [30, 25, 20, 15, 10]
        },
        maggiPasta: {
            labels: ["Classic Maggi", "Masala Pasta", "Cheese Maggi", "White Sauce Pasta", "Red Sauce Pasta"],
            data: [40, 25, 15, 12, 8]
        },
        pav: {
            labels: ["Vada Pav", "Bhaji Pav", "Samosa Pav", "Misal Pav", "Egg Pav"],
            data: [35, 25, 20, 12, 8]
        },
        pizza: {
            labels: ["Margherita", "Pepperoni", "Veggie Supreme", "BBQ Chicken", "Mushroom"],
            data: [30, 25, 20, 15, 10]
        },
        top20: {
            labels: Array.from({length: 20}, (_, i) => `Item ${i + 1}`),
            data: Array.from({length: 20}, () => Math.floor(Math.random() * 50) + 50)
        }
    };

    // Create Chart Function
    const createChart = (canvasId, data, label, backgroundColor) => {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, backgroundColor);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');

        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: label,
                    data: data.data,
                    backgroundColor: gradient,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: label,
                        color: '#ffcc00',
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                        padding: 20
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            callback: value => `${value}%`
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    };

    // Initialize Charts
    createChart("categorySalesChart", chartData.categories, "Category-wise Sales Distribution", 'rgba(255, 99, 132, 0.8)');
    createChart("chineseSalesChart", chartData.chinese, "Chinese Cuisine Sales Distribution", 'rgba(54, 162, 235, 0.8)');
    createChart("cutletPakodaChart", chartData.cutletPakoda, "Cutlet & Pakoda Sales Distribution", 'rgba(75, 192, 192, 0.8)');
    createChart("maggiPastaChart", chartData.maggiPasta, "Maggi & Pasta Sales Distribution", 'rgba(255, 206, 86, 0.8)');
    createChart("pavChart", chartData.pav, "Pav-Based Dishes Sales Distribution", 'rgba(153, 102, 255, 0.8)');
    createChart("pizzaChart", chartData.pizza, "Pizza Sales Distribution", 'rgba(255, 159, 64, 0.8)');
    
    // Create Sales Concentration Chart
    const createSalesConcentrationChart = () => {
        const ctx = document.getElementById('salesConcentrationChart');
        if (!ctx) return;

        const data = Array.from({length: 20}, (_, i) => ({
            x: (i + 1) * 5,
            y: Math.min(100, Math.floor((i + 1) * 4 + Math.random() * 10))
        }));

        return new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Sales Concentration',
                    data: data,
                    borderColor: '#ffcc00',
                    backgroundColor: 'rgba(255, 204, 0, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Sales Concentration Analysis',
                        color: '#ffcc00',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cumulative Percentage of Sales'
                        },
                        ticks: {
                            callback: value => `${value}%`
                        }
                    },
                    x: {
                        type: 'linear',
                        title: {
                            display: true,
                            text: 'Percentage of Items'
                        },
                        ticks: {
                            callback: value => `${value}%`
                        }
                    }
                }
            }
        });
    };

    createSalesConcentrationChart();
});