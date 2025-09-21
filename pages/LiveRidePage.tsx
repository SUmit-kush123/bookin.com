
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useBookings } from '../contexts/BookingContext';
import { BookingDetails } from '../types';
import { IconXCircle, IconSparkles, IconCar, IconBike, IconStar, IconMapPin, IconClock, IconPhone, IconMessageCircle } from '../constants';

// Custom User and Driver Icons
const userIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#10b981" class="w-8 h-8"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" /></svg>'),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const getVehicleIcon = (type: 'car' | 'bike' | 'scooter' | 'bus') => new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${type === 'car' ? '#0d9488' : '#f59e0b'}" class="w-10 h-10"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13-.26.189.568.189-.866 0 .298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866zm2.25-2.25a.75.75 0 00-1.5 0v.551a3.976 3.976 0 01-1.581.822 2.25 2.25 0 01-1.897 0 3.976 3.976 0 01-1.581-.822V6.75a.75.75 0 00-1.5 0v.551a3.976 3.976 0 01-1.581.822 2.25 2.25 0 01-1.897 0 3.976 3.976 0 01-1.581-.822V6.75a.75.75 0 00-1.5 0v3.009c0 .636.249 1.226.694 1.672.445.446 1.036.693 1.666.693.63 0 1.22-.247 1.665-.693.445-.446.694-1.036.694-1.672v-.551a2.476 2.476 0 001.581-.822 2.25 2.25 0 001.897 0 2.476 2.476 0 001.581.822v.551c0 .636.249 1.226.694 1.672.445.446 1.036.693 1.666.693.63 0 1.22-.247 1.665-.693.445-.446.694-1.036.694-1.672V6.75z" clip-rule="evenodd" /></svg>`),
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

// Utility to calculate distance and ETA (simplified)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

const calculateETA = (distance: number): number => {
    const averageSpeedKmph = 30; // Mock average speed
    const timeHours = distance / averageSpeedKmph;
    return Math.max(1, Math.round(timeHours * 60)); // ETA in minutes
};


const AnimatedMarker: React.FC<{ position: L.LatLngExpression; icon: L.Icon }> = ({ position, icon }) => {
    const markerRef = useRef<L.Marker>(null);
    const map = useMap();

    useEffect(() => {
        if (markerRef.current && position) {
            markerRef.current.setLatLng(position);
            map.panTo(position, { animate: true, duration: 1 });
        }
    }, [position, map]);

    return <Marker ref={markerRef} position={position} icon={icon} />;
};


const LiveRidePage: React.FC = () => {
    const { bookingId } = useParams<{ bookingId: string }>();
    const { getBookingById } = useBookings();
    
    const [booking, setBooking] = useState<BookingDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [driverPosition, setDriverPosition] = useState<[number, number] | null>(null);
    const [eta, setEta] = useState<number | null>(null);
    const [distance, setDistance] = useState<number | null>(null);

    const customerLocation: [number, number] = useMemo(() => [27.7172, 85.3240], []); // Mock customer location

    useEffect(() => {
        if (!bookingId) {
            setError("Invalid Booking ID.");
            setIsLoading(false);
            return;
        }
        
        const foundBooking = getBookingById(bookingId);
        if (foundBooking && foundBooking.driver && foundBooking.vehicle) {
            setBooking(foundBooking);
            // This is where you would get the initial driver location, we use a mock one
            const initialDriverLoc: [number, number] = [27.7190, 85.3210];
            setDriverPosition(initialDriverLoc);
        } else {
            setError(`Could not find ride details for booking ID: ${bookingId}.`);
        }
        setIsLoading(false);

    }, [bookingId, getBookingById]);


    useEffect(() => {
        if (!driverPosition || !customerLocation) return;
        
        const interval = setInterval(() => {
            setDriverPosition(prevPos => {
                if (!prevPos) return null;

                const currentDist = calculateDistance(prevPos[0], prevPos[1], customerLocation[0], customerLocation[1]);
                setDistance(currentDist);
                setEta(calculateETA(currentDist));

                if (currentDist < 0.1) { // Driver has arrived
                    clearInterval(interval);
                    return prevPos;
                }

                // Move driver 5% closer each tick
                const newLat = prevPos[0] + (customerLocation[0] - prevPos[0]) * 0.05;
                const newLng = prevPos[1] + (customerLocation[1] - prevPos[1]) * 0.05;
                return [newLat, newLng] as [number, number];
            });
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, [driverPosition, customerLocation]);

    if (isLoading || !booking) {
        return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-12 px-4">
            <IconSparkles className="w-16 h-16 text-primary dark:text-accent-light animate-pulse mb-4" />
            <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT text-lg">Loading your ride details...</p>
          </div>
        );
    }

    if (error) {
         return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-12 px-4">
            <IconXCircle className="w-16 h-16 text-danger mb-4" />
            <h1 className="text-2xl font-semibold text-danger mb-2">Error Loading Ride</h1>
            <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT max-w-md mx-auto">{error}</p>
            <Link to="/my-bookings" className="text-primary hover:underline mt-6 inline-block bg-primary/10 px-4 py-2 rounded-md">View All My Bookings</Link>
          </div>
        );
    }
    
    const mapCenter: L.LatLngExpression = driverPosition || customerLocation;
    const driverIcon = getVehicleIcon(booking.vehicle!.type);

    return (
        <div className="relative h-[calc(100vh_-_80px)] w-full -my-6">
            <div className="h-full w-full">
                <MapContainer center={mapCenter} zoom={15} scrollWheelZoom={true} className="h-full w-full">
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    <Marker position={customerLocation} icon={userIcon} />
                    {driverPosition && <AnimatedMarker position={driverPosition} icon={driverIcon} />}
                    {driverPosition && <Polyline positions={[driverPosition, customerLocation]} color="teal" dashArray="5, 10" />}
                </MapContainer>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-[1000]">
                <div className="max-w-md mx-auto bg-white dark:bg-neutral-d-light/90 backdrop-blur-md rounded-2xl shadow-2xl p-5 border border-neutral-extralight/50 dark:border-neutral-d-extralight/50">
                    {/* Status */}
                    <div className="text-center mb-4">
                        <h2 className="text-xl font-bold text-neutral-dark dark:text-neutral-d-dark">
                            {eta && eta <= 1 ? 'Your driver is arriving!' : 'Your driver is on the way!'}
                        </h2>
                        <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT text-sm">ETA: <span className="font-semibold text-primary dark:text-accent-light">{eta || 'Calculating...'} min</span> ({distance?.toFixed(2) || '...'} km)</p>
                    </div>
                    
                    {/* Driver Info */}
                    <div className="flex items-center space-x-4 border-t border-b border-neutral-extralight dark:border-neutral-d-extralight py-4">
                        <img src={booking.driver!.image} alt={booking.driver!.name} className="w-16 h-16 rounded-full object-cover shadow-md" />
                        <div className="flex-grow">
                            <h3 className="font-semibold text-lg text-neutral-dark dark:text-neutral-d-dark">{booking.driver!.name}</h3>
                            <div className="flex items-center text-sm text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">
                                <IconStar className="w-4 h-4 text-amber-400 mr-1" />
                                <span>{booking.driver!.rating}</span>
                                <span className="mx-2">·</span>
                                {booking.vehicle!.type === 'car' ? <IconCar className="w-4 h-4 mr-1"/> : <IconBike className="w-4 h-4 mr-1"/>}
                                <span className="capitalize">{booking.vehicle!.make} {booking.vehicle!.model}</span>
                            </div>
                             <p className="text-xs font-mono bg-secondary dark:bg-neutral-d-extralight/50 inline-block px-2 py-0.5 rounded mt-1">{booking.vehicle!.plateNumber}</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-around items-center pt-4">
                        <button className="flex flex-col items-center text-neutral-dark dark:text-neutral-d-dark hover:text-primary dark:hover:text-accent-light transition-colors">
                            <IconPhone className="w-6 h-6 mb-1"/>
                            <span className="text-xs font-medium">Call</span>
                        </button>
                         <button className="flex flex-col items-center text-neutral-dark dark:text-neutral-d-dark hover:text-primary dark:hover:text-accent-light transition-colors">
                            <IconMessageCircle className="w-6 h-6 mb-1"/>
                            <span className="text-xs font-medium">Message</span>
                        </button>
                        <Link to="/support" className="flex flex-col items-center text-neutral-dark dark:text-neutral-d-dark hover:text-primary dark:hover:text-accent-light transition-colors">
                            <IconXCircle className="w-6 h-6 mb-1"/>
                            <span className="text-xs font-medium">Cancel</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveRidePage;
