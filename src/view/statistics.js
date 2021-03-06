import SmartView from "./smart.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {ChartSettings, ChartDataPropertyName} from "../const.js";
import {isEventStopping} from "../utils/event";
import {humanizeDuration} from "../utils/common.js";
import {
  countEventsPriceByEventType,
  countTripsTypesByType,
  countEventsDurationByEventType,
  getUniqTypes,
  setCtxHeight,
  getChartData,
} from "../utils/statistics.js";

const renderMoneyChart = (moneyCtx, events) => {
  const uniqEventsTypes = getUniqTypes(events);
  const eventsPriceByEventType = uniqEventsTypes.map((type) => countEventsPriceByEventType(events, type));
  const chartData = getChartData(eventsPriceByEventType, ChartDataPropertyName.PRICE);
  setCtxHeight(moneyCtx, uniqEventsTypes.length);

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartData.labels,
      datasets: [{
        data: chartData.data,
        backgroundColor: ChartSettings.Color.WHITE,
        hoverBackgroundColor: ChartSettings.Color.WHITE,
        anchor: ChartSettings.Position.START,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: ChartSettings.Color.BLACK,
          anchor: ChartSettings.Position.END,
          align: ChartSettings.Position.START,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: ChartSettings.Color.BLACK,
        fontSize: 23,
        position: ChartSettings.Position.LEFT
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: ChartSettings.Color.BLACK,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};
const renderTransportChart = (transportCtx, events) => {
  const eventsTypes = events.map((event) => event.type);
  const filteredEventsTypes = eventsTypes.filter((eventType) => !isEventStopping(eventType));
  const uniqEventsTypes = [...new Set(filteredEventsTypes)];
  const tripsTypesByType = uniqEventsTypes.map((type) => countTripsTypesByType(filteredEventsTypes, type));

  const chartData = getChartData(tripsTypesByType, ChartDataPropertyName.COUNT);

  setCtxHeight(transportCtx, uniqEventsTypes.length);

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartData.labels,
      datasets: [{
        data: chartData.data,
        backgroundColor: ChartSettings.Color.WHITE,
        hoverBackgroundColor: ChartSettings.Color.WHITE,
        anchor: ChartSettings.Position.START,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: ChartSettings.Color.BLACK,
          anchor: ChartSettings.Position.END,
          align: ChartSettings.Position.START,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: ChartSettings.Color.BLACK,
        fontSize: 23,
        position: ChartSettings.Position.LEFT
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: ChartSettings.Color.BLACK,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};
const renderTimeChart = (timeCtx, events) => {
  const uniqEventsTypes = getUniqTypes(events);
  const eventsDurationByEventType = uniqEventsTypes.map((type) => countEventsDurationByEventType(events, type));

  const chartData = getChartData(eventsDurationByEventType, ChartDataPropertyName.DURATION);

  setCtxHeight(timeCtx, uniqEventsTypes.length);

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartData.labels,
      datasets: [{
        data: chartData.data,
        backgroundColor: ChartSettings.Color.WHITE,
        hoverBackgroundColor: ChartSettings.Color.WHITE,
        anchor: ChartSettings.Position.START,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: ChartSettings.Color.BLACK,
          anchor: ChartSettings.Position.END,
          align: ChartSettings.Position.START,
          formatter: (val) => `${humanizeDuration(val)}`
        }
      },
      title: {
        display: true,
        text: `TIME SPENT`,
        fontColor: ChartSettings.Color.BLACK,
        fontSize: 23,
        position: ChartSettings.Position.LEFT
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: ChartSettings.Color.BLACK,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};
const createStatisticsTemplate = () => {
  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

export default class Statistics extends SmartView {
  constructor(events) {
    super();
    this._data = events;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();
    if (this._moneyChart !== null || this._transportChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._transportChart = null;
      this._timeChart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._transportChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._transportChart = null;
      this._timeChart = null;
    }

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeCtx = this.getElement().querySelector(`.statistics__chart--time`);

    this._moneyChart = renderMoneyChart(moneyCtx, this._data);
    this._transportChart = renderTransportChart(transportCtx, this._data);
    this._timeChart = renderTimeChart(timeCtx, this._data);
  }
}
