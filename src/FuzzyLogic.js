import { addTemperatureLineChart, addTemperatureBarChart, addCloudCoverChart, addCloudCoverBarChart, addSpeedChart } from "./charts";

export default class FuzzyLogic {
    constructor(freezingMf, coolMf, warmMf, hotMf,
                sunnyMf, cloudyMf, overcastMf, 
                slowMf, fastMf,
            ) {
        this.freezingMf = freezingMf;
        this.coolMf = coolMf;
        this.warmMf = warmMf;
        this.hotMf = hotMf;
        this.sunnyMf = sunnyMf;
        this.cloudyMf = cloudyMf;
        this.overcastMf = overcastMf;
        this.slowMf = slowMf;
        this.fastMf = fastMf;
    };

    #updateLineCharts = (temp, cloudCover) => {
        this.temperatureLineChart.options.plugins.annotation.annotations[0].xMin = parseInt(temp);
        this.temperatureLineChart.options.plugins.annotation.annotations[0].xMax = parseInt(temp);
        this.temperatureLineChart.update();

        this.cloudCoverChart.options.plugins.annotation.annotations[0].xMin = parseInt(cloudCover);
        this.cloudCoverChart.options.plugins.annotation.annotations[0].xMax = parseInt(cloudCover);
        this.cloudCoverChart.update();
    }

    #updateBarCharts = (fuzzyT, fuzzyCC) => {
        this.temperatureBarChart.data.datasets[0].data = fuzzyT;
        this.temperatureBarChart.update();

        this.cloudCoverBarChart.data.datasets[0].data = fuzzyCC;
        this.cloudCoverBarChart.update();
    }

    #updateSpeedChart = (aggregatedValues) => {
        if (this.speedChart.data.datasets.length > 2) {
            this.speedChart.data.datasets.pop();
        }

        const ctx = document.getElementById("speedChart").getContext("2d");

        var gradient = ctx.createLinearGradient(0, 0, 0, parseInt(document.getElementById("speedChart").style.height));
        gradient.addColorStop(0, 'rgba(124, 58, 237,1)');   
        gradient.addColorStop(1, 'rgba(124, 58, 237,0)');

        this.speedChart.data.datasets.push({
            label: "Aggregated Values",
            data: aggregatedValues,
            fill: true,
            backgroundColor: gradient,
            borderColor: "rgba(124, 58, 237,1)",
            borderWidth: 5,
            pointColor: "#fff",
            pointStrokeColor: "#ff6c23",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "#ff6c23",
            order: 1
            },
        );

        this.speedChart.update();
    }

    #setCenterOfGravity = (cog, fast, slow) => {
        this.speedChart.options.plugins.annotation.annotations[0] = {
            type: "point",
            xValue: cog,
            yValue: Math.max(fast / 2, slow / 2),
            backgroundColor: "#f87171",
            borderColor: "#f87171"
        };

        this.speedChart.options.plugins.annotation.annotations[1] = {
            type: "label",
            xValue: cog,
            yValue: Math.max(fast / 2, slow / 2) + .08,
            color: "white",
            content: cog.toString() === "NaN" ? "0" : (+cog.toFixed(2)).toString(),
            font: {
                size: 24,
                weight: "bold",
                family: "Roboto"
            },
        };

        this.speedChart.update();
    }

    initialize() {
        this.temperatureLineChart = addTemperatureLineChart(this.freezingMf, this.coolMf, this.warmMf, this.hotMf);
        this.cloudCoverChart = addCloudCoverChart(this.sunnyMf, this.cloudyMf, this.overcastMf);
        this.speedChart = addSpeedChart(this.slowMf, this.fastMf);

        this.temperatureBarChart = addTemperatureBarChart([]);
        this.cloudCoverBarChart = addCloudCoverBarChart([]);
    }

    processInput(tempValue, cloudCoverValue) {
        this.#updateLineCharts(tempValue, cloudCoverValue);

        const [fuzzyT, fuzzyCC] = this.fuzzify(tempValue, cloudCoverValue);
        this.#updateBarCharts(fuzzyT, fuzzyCC);

        const [fastValue, slowValue] = this.applyRules(fuzzyCC[0], fuzzyT[2], fuzzyCC[1], fuzzyT[1]);
        
        const aggregatedValues = this.aggregate(slowValue, fastValue);
        this.#updateSpeedChart(aggregatedValues);

        const cog = this.defuzzify(aggregatedValues);
        this.#setCenterOfGravity(cog, slowValue, fastValue);
    }

    fuzzify(tempValue, cloudCoverValue) {
        const fuzzifiedTemp = [
            this.freezingMf.calculate(tempValue),
            this.coolMf.calculate(tempValue),
            this.warmMf.calculate(tempValue),
            this.hotMf.calculate(tempValue)
        ];

        const fuzzifiedCloudCover = [
            this.sunnyMf.calculate(cloudCoverValue),
            this.cloudyMf.calculate(cloudCoverValue),
            this.overcastMf.calculate(cloudCoverValue)
        ];

        return [fuzzifiedTemp, fuzzifiedCloudCover];
    };

    applyRules(sunny, warm, cloudy, cool) {
        return [Math.min(sunny, warm), Math.min(cloudy, cool)];
    };

    aggregate(slowValue, fastValue) {
        return Array.from({length: 101}, (_, i) => 
            Math.max(Math.min(this.slowMf.calculate(i), slowValue), Math.min(this.fastMf.calculate(i), fastValue))
        );
    };

    defuzzify(aggregatedValues) {
        let sumY = 0;
        let sumXY = 0;

        for (let i = 0; i < aggregatedValues.length; i++) {
            sumY += parseFloat(aggregatedValues[i]);
            sumXY += (i * parseFloat(aggregatedValues[i]));
        }
        return (parseFloat(sumXY) / parseFloat(sumY));
    };
}