import { useContext } from 'react';
import { ScrapeContext } from './ScrapeContext';
import Table from './Table';
import Chart from './Chart';

export default function Data() {
  const { scrapes, fetchScrapes } = useContext(ScrapeContext);
  return (
    <div>
      <button type="button" onClick={fetchScrapes}>
        Refresh Data
      </button>
      <h2>Your Data:</h2>
      <Chart scrapes={scrapes.twitter} />
      <Chart scrapes={scrapes.instagram} />
      <h3>Twitter</h3>
      <Table scrapes={scrapes.twitter} />
      <h3>Instagram</h3>
      <Table scrapes={scrapes.instagram} />
    </div>
  );
}
