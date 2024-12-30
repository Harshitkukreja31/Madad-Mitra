import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Navigation, Check, X, Home as HomeIcon, Briefcase, MapPinIcon } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// List of supported cities
const SUPPORTED_CITIES = [
  'Delhi', 
  'New Delhi', 
  'Gurugram', 
  'Noida', 
  'Ghaziabad', 
  'Faridabad', 
  'Greater Noida'
];
// Custom Map Click Handler Component
const MapClickHandler = ({ onLocationSelect }) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
    },
  });
  return null;
};
const AddressSelector = ({selectedAddress , setSelectedAddress}) => {
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  // const [selectedAddress, setSelectedAddress] = useState(null);
  const [locationStatus, setLocationStatus] = useState('');
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]); // Default to Delhi
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [serviceAvailability, setServiceAvailability] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [addressType, setAddressType] = useState('');
  useEffect(()=>{
    fetchSavedAddresses();
  },[]);
  const fetchSavedAddresses = async()=>{
    try{
      const token = localStorage.getItem('authToken');
      const response = await fetch("http://ec2-13-61-26-86.eu-north-1.compute.amazonaws.com:8084/address",{
        headers:{
          'Authorization':token
        }
      })
        
      if(!response.ok){
        throw new Error('Failed to fetch addresses');
      }
      const addresses = await response.json();
      console.log(addresses);
      setSavedAddresses(addresses);
    }
    catch (error){
      console.log(error);
    }
  }
  const [newAddress, setNewAddress] = useState({
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    coordinates: null
  });
  // Enhanced function to parse address components from Nominatim response
  const parseAddressComponents = (nominatimData) => {
    const address = nominatimData.address || {};
    
    // Extract street address
    const streetNumber = address.house_number || '';
    const streetName = address.road || address.street || '';
    const street = `${streetNumber} ${streetName}`.trim();
    
    // Extract apartment/unit info
    const unit = address.unit || address.apartment || '';
    
    // Extract city (try multiple possible fields)
    const city = address.city || 
                address.town || 
                address.village || 
                address.suburb || 
                address.municipality || '';
    
    // Extract state
    const state = address.state || 
                 address.province || 
                 address.state_district || '';
    
    // Extract postal code
    const zipCode = address.postcode || '';
    
    return {
      street,
      apartment: unit,
      city,
      state,
      zipCode
    };
  };
  // Check if city is supported
  const checkCityAvailability = (city) => {
    const normalizedCity = city.trim();
    const isSupported = SUPPORTED_CITIES.some(supportedCity => 
      normalizedCity.toLowerCase().includes(supportedCity.toLowerCase())
    );
    setServiceAvailability(isSupported);
    return isSupported;
  };
  // Updated function to get structured address from coordinates
  const getAddressFromCoordinates = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
      );
      const data = await response.json();
      const parsedAddress = parseAddressComponents(data);
      
      // Check city availability
      checkCityAvailability(parsedAddress.city);
      
      return parsedAddress;
    } catch (error) {
      console.error('Error fetching address:', error);
      return null;
    }
  };
  const handleMapLocationSelect = async (lat, lng) => {
    const addressComponents = await getAddressFromCoordinates(lat, lng);
    if (addressComponents) {
      setNewAddress(prev => ({
        ...prev,
        ...addressComponents,
        coordinates: [lat, lng]
      }));
    }
    setShowMap(false);
  };
  const getCurrentLocation = () => {
    setLocationStatus('detecting');
    setServiceAvailability(null);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setMapCenter([latitude, longitude]);
          
          // Get structured address from coordinates
          const addressComponents = await getAddressFromCoordinates(latitude, longitude);
          if (addressComponents) {
            setNewAddress(prev => ({
              ...prev,
              ...addressComponents,
              coordinates: [latitude, longitude]
            }));
          }
          
          setLocationStatus('success');
        },
        () => {
          setLocationStatus('error');
        }
      );
    } else {
      setLocationStatus('unavailable');
    }
  };
  const handleSaveAddress = async () => {
    // Validate city availability
    const cityAvailable = checkCityAvailability(newAddress.city);
    if (!addressType || !newAddress.street || !newAddress.city) {
      alert('Please fill in required fields');
      return;
    }
    if (!cityAvailable) {
      alert('Sorry, we are not available in this location right now.');
      return;
    }
    
    const addressToSave = {
      label: addressType,
      streetAddress: `${newAddress.street}${newAddress.apartment ? `, ${newAddress.apartment}` : ''}`,
      city: newAddress.city,
      state: newAddress.state,
      zipCode: newAddress.zipCode,
      isDefault: savedAddresses.length === 0
    };
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch("http://ec2-13-61-26-86.eu-north-1.compute.amazonaws.com:8084/address", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(addressToSave)
      });
      if (!response.ok) {
        throw new Error('Failed to save address');
      }
      await response.json();
      
      // Update local state
      setSavedAddresses([...savedAddresses, addressToSave]);
      setSelectedAddress(addressToSave);
      setShowNewAddressForm(false);
      
      // Reset form
      setNewAddress({
        street: '',
        apartment: '',
        city: '',
        state: '',
        zipCode: '',
        coordinates: null
      });
      setAddressType('');
      setServiceAvailability(null);
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address. Please try again.');
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-8">
          <div className="card">
            <div className="card-body p-4">
              <h3 className="h4 mb-4">Delivery Address</h3>
              
              {/* Saved Addresses */}
              <div className="mb-4">
              {savedAddresses.map((addr) => (
  <div
    key={addr._id}
    className={`card mb-2 cursor-pointer ${
      selectedAddress?._id === addr._id ? 'border-primary bg-light' : ''
    }`}
    onClick={() => setSelectedAddress(addr)}
    style={{ cursor: 'pointer' }}
  >
    <div className="card-body py-2">
      <div className="d-flex align-items-center">
        <MapPin className="flex-shrink-0 me-2" size={20} />
        <div className="flex-grow-1">
          <p className="mb-0 fw-medium">{addr.streetAddress}</p>
          <p className="mb-0 small text-muted">{addr.city}</p>
        </div>
        {addr.isDefault && (
          <span className="badge bg-primary ms-2">Default</span>
        )}
        {selectedAddress?._id === addr._id && (
          <Check className="ms-2 text-primary" size={20} />
        )}
      </div>
    </div>
  </div>
))}
              </div>
              {/* Action Buttons */}
              <div className="d-flex flex-wrap gap-2 mb-4">
                <button
                  className="btn btn-outline-primary d-flex align-items-center gap-2"
                  onClick={() => setShowNewAddressForm(true)}
                >
                  <Plus size={16} />
                  Add New Address
                </button>
                
                <button
                  className="btn btn-outline-primary d-flex align-items-center gap-2"
                  onClick={getCurrentLocation}
                >
                  <Navigation size={16} />
                  Use Current Location
                </button>
                <button
                  className="btn btn-outline-primary d-flex align-items-center gap-2"
                  onClick={() => setShowMap(true)}
                >
                  <MapPin size={16} />
                  Select on Map
                </button>
              </div>
              {/* Location Status */}
              {locationStatus && (
                <div className={`alert ${
                  locationStatus === 'error' ? 'alert-danger' : 'alert-info'
                } mb-4`}>
                  {locationStatus === 'detecting' && 'Detecting your location...'}
                  {locationStatus === 'success' && 'Location detected successfully!'}
                  {locationStatus === 'error' && 'Failed to detect location. Please try again.'}
                  {locationStatus === 'unavailable' && 'Location services are not available.'}
                </div>
              )}
              {/* Service Availability Notification */}
              {serviceAvailability !== null && (
                <div className={`alert ${
                  serviceAvailability ? 'alert-success' : 'alert-warning'
                } mb-4 d-flex justify-content-between align-items-center`}>
                  {serviceAvailability 
                    ? 'Great! We serve this location.' 
                    : 'Sorry, we are not available in this location right now.'}
                  {!serviceAvailability && (
                    <X 
                      className="cursor-pointer" 
                      onClick={() => setServiceAvailability(null)} 
                      size={20} 
                    />
                  )}
                </div>
              )}
              {/* Map View */}
              {showMap && (
                <div className=" mb-4">
                  <div >
                    <div style={{ height: '400px', width: '100%' }}>
                      <MapContainer
                        center={mapCenter}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {currentLocation && (
                          <Marker position={[currentLocation.lat, currentLocation.lng]} />
                        )}
                        <MapClickHandler onLocationSelect={handleMapLocationSelect} />
                      </MapContainer>
                    </div>
                    <div className="mt-3">
                      <button 
                        className="btn btn-secondary"
                        onClick={() => setShowMap(false)}
                      >
                        Close Map
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* New Address Form */}
              {showNewAddressForm && (
                <div >
                  <div >
                    {/* Address Type Selection */}
                    <div className="mb-3">
                      <label className="form-label">Select Address Type</label>
                      <div className="d-flex gap-2">
                        <button
                          className={`btn ${
                            addressType === 'Home' 
                              ? 'btn-primary' 
                              : 'btn-outline-secondary'
                          } d-flex align-items-center gap-2`}
                          onClick={() => setAddressType('Home')}
                        >
                          <HomeIcon size={16} />
                          Home
                        </button>
                        <button
                          className={`btn ${
                            addressType === 'Office' 
                              ? 'btn-primary' 
                              : 'btn-outline-secondary'
                          } d-flex align-items-center gap-2`}
                          onClick={() => setAddressType('Office')}
                        >
                          <Briefcase size={16} />
                          Office
                        </button>
                        <button
                          className={`btn ${
                            addressType === 'Other' 
                              ? 'btn-primary' 
                              : 'btn-outline-secondary'
                          } d-flex align-items-center gap-2`}
                          onClick={() => setAddressType('Other')}
                        >
                          <MapPinIcon size={16} />
                          Other
                        </button>
                      </div>
                    </div>
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Street Address"
                          value={newAddress.street}
                          onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Apartment, Suite, etc."
                          value={newAddress.apartment}
                          onChange={(e) => setNewAddress({...newAddress, apartment: e.target.value})}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <select
                          className="form-select"
                          value={newAddress.city}
                          onChange={(e) => {
                            const selectedCity = e.target.value;
                            setNewAddress({...newAddress, city: selectedCity});
                            checkCityAvailability(selectedCity);
                          }}
                        >
                          <option value="">Select City</option>
                          {SUPPORTED_CITIES.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="State"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="ZIP Code"
                          value={newAddress.zipCode}
                          onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          setShowNewAddressForm(false);
                          setServiceAvailability(null);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={handleSaveAddress}
                        disabled={!addressType}
                      >
                        Save Address
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddressSelector;