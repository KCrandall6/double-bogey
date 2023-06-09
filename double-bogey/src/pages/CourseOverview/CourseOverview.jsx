import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import L from 'leaflet';
import { endpoint } from '../../configEndpoint';
import golfPin from '../../figures/pin_golf.png';
import miniGolfPin from '../../figures/pin_minigolf.png';

const CourseOverview = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`${endpoint}/.netlify/functions/getAllCourses`)
      .then((res) => res.json())
      .then((res) => setCourses(res));
  }, []);

  const golfIcon = L.icon({
    iconUrl: golfPin,
    iconSize: [25, 38],
    iconAnchor: [12, 38],
  });
  
  const miniGolfIcon = L.icon({
    iconUrl: miniGolfPin,
    iconSize: [25, 38],
    iconAnchor: [12, 38],
  });

  return (
    <div className="mobile-container">
      <div className="d-flex flex-column m-2 text-center align-items-center">
        <h1>Courses</h1>
        <div className="d-flex align-items-center m-2 p-2 border bg-light">
          <img
          alt="golf"
          src={golfPin}
          width="25"
          />
          <h5 className='ms-1 me-3'>Golf</h5>
          <img
          alt="golf"
          src={miniGolfPin}
          width="25"
          />
          <h5 className='ms-1 me-3'>Mini-Golf</h5>
        </div>
        <MapContainer
          style={{ height: "400px", width: "100%", maxWidth: "700px", border: "1px solid black" }}
          center={[33.4, -111.75]}
          zoom={10}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {courses.length > 0 &&
            courses[0].latlong !== undefined &&
            courses.map((course, index) => (
              <Marker key={index + 1} position={JSON.parse(course.latlong)} icon={course.golf_type === 'golf' ? golfIcon : miniGolfIcon}>
                <Popup >
                  <h4>{course.courseName}</h4>
                  <p>{course.address}</p>
                  <p>{course.phoneNumber}</p>
                  <a
                    href={course.website.startsWith('https') ? course.website : `https://${course.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CourseOverview;