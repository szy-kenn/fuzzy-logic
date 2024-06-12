import Chart, { Colors } from "chart.js/auto";
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);
Chart.defaults.borderColor = "#172554";
Chart.defaults.color = "#60a5fa";

export const addTemperatureLineChart = (freezingMf, coolMf, warmMf, hotMf) => {
    const datasets = {
      labels: Array.from({ length: 111 }, (_, i) => i), 
      datasets: [
        {
          label: 'Freezing',
          data: Array.from({length: 111}, (_, i) => freezingMf.calculate(i)),
          fill: false,
          backgroundColor: '#3b82f6',
          borderColor: '#3b82f6',
        },
        {
          label: 'Cool',
          data: Array.from({length: 111}, (_, i) => coolMf.calculate(i)),
          fill: false,
          backgroundColor: '#67e8f9',
          borderColor: '#67e8f9',
        },
        {
          label: 'Warm',
          data: Array.from({length: 111}, (_, i) => warmMf.calculate(i)),
          fill: false,
          backgroundColor: '#fef08a',
          borderColor: '#fef08a',
        },
        {
          label: 'Hot',
          data: Array.from({length: 111}, (_, i) => hotMf.calculate(i)),
          fill: false,
          backgroundColor: "#fca5a5",
          borderColor: '#fca5a5',
        },
      ]
    };
  
    return new Chart(
      document.getElementById('temperatureChart'),
      {
        type: 'line',
        data: datasets,
        options: {
          radius: 0,
          layout: {
            padding: 0
          },
          scales: {
            x: {
              min: 0,
              max: 110,
            },
            y: {
              min: 0,
              max: 1.0,
              ticks: {
                stepSize: .1
              },
            },
          },
          responsive: true, 
          interaction: {
            mode: "x"
          },
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'Temperature',
              font: {
                family: "Helvetica",
              }
            },
            annotation: {
              annotations: [{
                type: "line",
                xMin: 1,
                xMax: 1,
                yMin: 0,
                yMax: 1,
                borderColor: "#4ade80",
                borderWidth: 2,
                borderDash: [5, 5],
                label: {
                  enabled: true,
                  content: "Test"
                },
              }]
            }
        },
      },
      },
    );
  }


export const addTemperatureBarChart = (data) => {

  const datasets = {
    labels: ["F", "C", "W", "H"],
    datasets: [{
      data: data,
      borderColor: ["#3b82f6", "#67e8f9", "#fef08a", "#fca5a5"],
      borderWidth: 3,
    }]
  };

  return new Chart(
    document.getElementById("temperatureBarChart"),
    {
      type: "bar",
      data: datasets,
      options: {
        indexAxis: "y",
        elements: {
          bar: {
            borderWidth: 4,
          }
        },
        scales: {
          x: {
            min: 0,
            max: 1.0,
            ticks: {
              stepSize: .1
            },
            grid: {
              color: "rgba(0, 0, 0, 0)"
            },
          },
          y: {
            grid: {
              color: "rgba(0, 0, 0, 0)"
            },
          }
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Temperature Fuzzy Logic"
          }
        }
      }
    })
}

export const addCloudCoverChart = (sunnyMf, partlyCloudyMf, overcastMf) => {
  const datasets = {
    labels: Array.from({ length: 101 }, (_, i) => i), 
    datasets: [
      {
        label: 'Sunny',
        data: Array.from({length: 101}, (_, i) => sunnyMf.calculate(i)),
        fill: false,
        backgroundColor: '#fcd34d',
        borderColor: '#fcd34d',
      },
      {
        label: 'Partly Cloudly',
        data: Array.from({length: 101}, (_, i) => partlyCloudyMf.calculate(i)),
        fill: false,
        backgroundColor: '#fdba74',
        borderColor: '#fdba74',
      },
      {
        label: 'Overcast',
        data: Array.from({length: 101}, (_, i) => overcastMf.calculate(i)),
        fill: false,
        backgroundColor: '#0e7490',
        borderColor: '#0e7490',
      },
    ]
  };

  return new Chart(
    document.getElementById('cloudCoverChart'),
    {
      type: 'line',
      data: datasets,
      options: {
        radius: 0,
        layout: {
          padding: 0
        },
        scales: {
          y: {
            min: 0,
            max: 1.0,
            ticks: {
              stepSize: .1
            }
          },
        },
        responsive: true, 
        interaction: {
          mode: "x"
        },
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Cloud Cover',
            font: {
              family: "Helvetica",
            }
          },
          annotation: {
            annotations: [{
              type: "line",
              xMin: 1,
              xMax: 1,
              yMin: 0,
              yMax: 1,
              borderColor: "#4ade80",
              borderWidth: 2,
              borderDash: [10, 10],
              label: {
                enabled: true,
                content: "Test"
              },
            }]
          }
      },
    },
    },
  );
}

export const addCloudCoverBarChart = (data) => {

  const datasets = {
    labels: ["S", "PC", "O"],
    datasets: [{
      data: data,
      borderColor: ["#fcd34d", "#fdba74", "#0e7490"],
      borderWidth: 3,
    }]
  };

  return new Chart(
    document.getElementById("cloudCoverBarChart"),
    {
      type: "bar",
      data: datasets,
      options: {
        indexAxis: "y",
        elements: {
          bar: {
            borderWidth: 4,
          }
        },
        scales: {
          x: {
            min: 0,
            max: 1.0,
            ticks: {
              stepSize: .1
            },
            grid: {
              color: "rgba(0, 0, 0, 0)"
            }
          },
          y: {
            grid: {
              color: "rgba(0, 0, 0, 0)"
            }
          }
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Cloud Cover Fuzzy Logic"
          }
        }
      }
    })
}

export const addSpeedChart = (slowMf, fastMf) => {
  const datasets = {
    labels: Array.from({ length: 101 }, (_, i) => i), 
    datasets: [
      {
        label: 'Slow',
        data: Array.from({length: 101}, (_, i) => i > slowMf.p4.x ? null : slowMf.calculate(i)),
        fill: false,
        backgroundColor: '#bbf7d0',
        borderColor: '#bbf7d0',
        order: 2,
      },
      {
        label: 'Fast',
        data: Array.from({length: 101}, (_, i) => i < fastMf.p1.x || i > fastMf.p4.x ? null : fastMf.calculate(i)),
        fill: false,
        backgroundColor: '#fda4af',
        borderColor: '#fda4af',
        order: 2,
      },
    ]
  };

  return new Chart(
    document.getElementById('speedChart'),
    {
      type: 'line',
      data: datasets,
      options: {
        radius: 0,
        layout: {
          padding: 0
        },
        scales: {
          y: {
            min: 0,
            max: 1.0,
            ticks: {
              stepSize: .1
            },
          },
          x: {
            grid: {
              color: "rgba(0, 0, 0, 0)"
            },
          }
        },
        responsive: true, 
        interaction: {
          mode: "x"
        },
        plugins: {
          title: {
            display: true,
            text: 'Speed',
            font: {
              size: 24,
              family: "Helvetica",
            }
          },
      },
    },
    },
  );
}
