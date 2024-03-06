import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAircrafts } from '../redux/aircrafts/aircraftsSlice';
import { RootState } from '../redux/store';

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state: RootState) => state.aircrafts);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const apiKey = 'D5q8niB700jxi57PqkJC6Q==D1xzw7ooFWM5nyYD';

    // Fetch all aircrafts initially
    dispatch(
      fetchAircrafts({
        api_key: apiKey,
        manufacturer: 'Gulfstream',
        model: ''
      }) as any
    );
  }, [dispatch]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSearchInput = event.target.value;
    setSearchInput(newSearchInput);

    // Fetch aircrafts based on the search input only if the search input is not empty
    if (newSearchInput.trim() !== '') {
      const apiKey = 'D5q8niB700jxi57PqkJC6Q==D1xzw7ooFWM5nyYD';
      dispatch(
        fetchAircrafts({
          api_key: apiKey,
          manufacturer: newSearchInput,
          model: ''
        }) as any
      );
    } else {
      // If the search input is empty, fetch all aircrafts again
      const apiKey = 'D5q8niB700jxi57PqkJC6Q==D1xzw7ooFWM5nyYD';
      dispatch(
        fetchAircrafts({
          api_key: apiKey,
          manufacturer: '',
          model: ''
        }) as any
      );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto my-8 p-8 bg-white shadow-md rounded-md">
        <h1 className="text-4xl font-semibold mb-8 text-center">
          Aircraft Details
        </h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Aircraft by Manufacturer"
            value={searchInput}
            onChange={handleSearchInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {loading && <p className="text-center">Loading...</p>}

        {data.length > 0 ? (
          data.map((aircraft, index) => (
            <div
              key={index}
              className="bg-blue-50 p-6 mb-6 rounded-md shadow-md"
            >
              <h3 className="text-2xl font-semibold mb-4">{aircraft.model}</h3>
              <p>
                <span className="font-bold">Manufacturer:</span>{' '}
                {aircraft.manufacturer}
              </p>
              <p className="mt-2">Engine Type: {aircraft.engine_type}</p>
              <p>Engine Thrust: {aircraft.engine_thrust_lb_ft}</p>
              <p>Max Speed: {aircraft.max_speed_knots} knots</p>
              <p>Cruise Speed: {aircraft.cruise_speed_knots} knots</p>
              <p>Ceiling: {aircraft.ceiling_ft} feet</p>
              <p>
                Rate of Climb: {aircraft.rate_of_climb_ft_per_min} feet per
                minute
              </p>
              <p>Takeoff Ground Run: {aircraft.takeoff_ground_run_ft} feet</p>
              <p>Landing Ground Roll: {aircraft.landing_ground_roll_ft} feet</p>
              <p>Gross Weight: {aircraft.gross_weight_lbs} lbs</p>
              <p>Empty Weight: {aircraft.empty_weight_lbs} lbs</p>
              <p>Length: {aircraft.length_ft} feet</p>
              <p>Height: {aircraft.height_ft} feet</p>
              <p>Wingspan: {aircraft.wing_span_ft} feet</p>
              <p>Range: {aircraft.range_nautical_miles} nautical miles</p>
            </div>
          ))
        ) : (
          <p className="text-center">No matching results</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
