import SmartView from "./smart.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {ChartSettings} from "../const.js";
import {makeItemsUniq, countEventsPriceByEventType, countTripsTypesByType} from "../utils/statistics.js";
import {isEventStopping} from "../utils/event";

const renderMoneyChart = (moneyCtx, events) => {
  const eventsTypes = events.map((event) => event.type);
  const uniqEventTypes = makeItemsUniq(eventsTypes);
  const eventsPriceByEventType = uniqEventTypes.map((type) => countEventsPriceByEventType(events, type));
  eventsPriceByEventType.sort((eventA, eventB) => eventB.price - eventA.price);
  const chartLabels = eventsPriceByEventType.map((eventPrice) => eventPrice.type.toUpperCase());
  const chartData = eventsPriceByEventType.map((eventPrice) => eventPrice.price);

  moneyCtx.height = ChartSettings.BAR_HEIGHT * uniqEventTypes.length;

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartLabels,
      datasets: [{
        data: chartData,
        backgroundColor: ChartSettings.COLOR.WHITE,
        hoverBackgroundColor: ChartSettings.COLOR.WHITE,
        anchor: ChartSettings.POSITION.START,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: ChartSettings.COLOR.BLACK,
          anchor: ChartSettings.POSITION.END,
          align: ChartSettings.POSITION.START,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: ChartSettings.COLOR.BLACK,
        fontSize: 23,
        position: ChartSettings.POSITION.LEFT
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: ChartSettings.COLOR.BLACK,
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
  const tripsTypes = eventsTypes.filter((eventType) => !isEventStopping(eventType));
  const uniqTripsTypes = makeItemsUniq(tripsTypes);
  const tripsTypesByType = uniqTripsTypes.map((type) => countTripsTypesByType(tripsTypes, type));
  tripsTypesByType.sort((typeA, typeB) => typeB.count - typeA.count);
  const chartLabels = tripsTypesByType.map((tripType) => tripType.type.toUpperCase());
  const chartData = tripsTypesByType.map((tripType) => tripType.count);

  transportCtx.height = ChartSettings.BAR_HEIGHT * tripsTypesByType.length;

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartLabels,
      datasets: [{
        data: chartData,
        backgroundColor: ChartSettings.COLOR.WHITE,
        hoverBackgroundColor: ChartSettings.COLOR.WHITE,
        anchor: ChartSettings.POSITION.START,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: ChartSettings.COLOR.BLACK,
          anchor: ChartSettings.POSITION.END,
          align: ChartSettings.POSITION.START,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: ChartSettings.COLOR.BLACK,
        fontSize: 23,
        position: ChartSettings.POSITION.LEFT
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: ChartSettings.COLOR.BLACK,
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
const renderTimeSpendChart = () => {

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
    this._timeSpendChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();
    if (this._moneyChart !== null || this._transportChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._transportChart = null;
      this._timeSpendChart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._transportChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._transportChart = null;
      this._timeSpendChart = null;
    }

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time-spend`);

    // const BAR_HEIGHT = 55;
    // moneyCtx.height = BAR_HEIGHT * 6;
    // transportCtx.height = BAR_HEIGHT * 4;
    // timeSpendCtx.height = BAR_HEIGHT * 4;

    this._moneyChart = renderMoneyChart(moneyCtx, this._data);
    this._transportChart = renderTransportChart(transportCtx, this._data);
    this._timeSpendChart = renderTimeSpendChart(timeSpendCtx);
  }
}
