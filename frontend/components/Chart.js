import { PureComponent } from 'react';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from 'recharts';
import { distanceInWords } from 'date-fns';

export default class Chart extends PureComponent {
  render() {
    const scrapesWithDates = this.props.scrapes.map(scrape => {
      return {
        ...scrape,
        date: distanceInWords(new Date(scrape.date), new Date())
      };
    });
    return (
      <LineChart
        width={800}
        height={600}
        data={scrapesWithDates}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="count" type="number" domain={['dataMin', 'dataMax']} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    );
  }
}
