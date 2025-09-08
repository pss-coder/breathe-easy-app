import { getAQICategory, formatLocation } from '../lib/air-quality-display-helper';

describe('getAQICategory', () => {
  it('returns correct category for AQI 1', () => {
    const result = getAQICategory(1);
    expect(result.level).toBe('Good');
  });
  it('returns correct category for AQI 5', () => {
    const result = getAQICategory(5);
    expect(result.level).toBe('Very Poor');
  });
  it('returns Unknown for invalid AQI', () => {
    const result = getAQICategory(99);
    expect(result.level).toBe('Unknown');
  });
});

// describe('getMainPollutant', () => {
//   it('returns pollutant with highest value', () => {
//     const components = dummyAirQualityResponse.list[0].components;
//     const result = getMainPollutant(components);
//     expect(result.name).toBe('CO'); // CO has highest value in dummy data
//   });
// });

describe('formatLocation', () => {
  it('formats with state', () => {
    expect(formatLocation('Bangalore', 'IN', 'Karnataka')).toBe('Bangalore, Karnataka, IN');
  });
  it('formats without state', () => {
    expect(formatLocation('Bangalore', 'IN')).toBe('Bangalore, IN');
  });
});
