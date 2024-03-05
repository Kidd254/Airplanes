// YourComponent.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAircrafts } from '../redux/aircrafts/aircraftsSlice';
import { RootState } from '../redux/store';

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.aircrafts);

  useEffect(() => {
    dispatch(fetchAircrafts('D5q8niB700jxi57PqkJC6Q==D1xzw7ooFWM5nyYD'));
  }, [dispatch]);

  // Render component based on data, loading, and error states
  return (
    <div>
      <h1>Aircraft Details</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data.map((aircraft, index) => (
        <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{aircraft.model}</h3>
          <p>Manufacturer: {aircraft.manufacturer}</p>
          <p>Engine Type: {aircraft.engine_type}</p>
          <p>Speed Range: {aircraft.min_speed} knots - {aircraft.max_speed} knots</p>
          <p>Range: {aircraft.min_range} nautical miles - {aircraft.max_range} nautical miles</p>
          <p>Length: {aircraft.min_length} feet - {aircraft.max_length} feet</p>
          <p>Height: {aircraft.min_height} feet - {aircraft.max_height} feet</p>
          <p>Wingspan: {aircraft.min_wingspan} feet - {aircraft.max_wingspan} feet</p>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
