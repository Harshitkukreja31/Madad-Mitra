import React, { useState, useEffect } from 'react';

const IdentitySection = () => {
  // State management for user data and UI states
  const [userData, setUserData] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user email from localStorage
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        const userEmail = userDetails[0].email;

        const token = localStorage.getItem('authToken');
        const response = await fetch("http://localhost:8084/user/userData",{
          headers:{
            'Authorization':token
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        
        setUserData(data);
        
        setAvatarUrl(data.avatar);
      } catch (err) {
        setError('Failed to load user information');
        console.error('Error fetching user data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [avatarUrl]);
  
  // Handle avatar file selection and upload
  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, etc.)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be smaller than 2MB');
      return;
    }

    try {
      setIsUploading(true);
      setError('');

      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      const userId = userDetails[0]._id;

      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('userId', userId);

      const response = await fetch('http://localhost:8084/user/upload/avatar', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      setAvatarUrl(data.avatarUrl);
    } catch (err) {
      setError(err.message || 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error && !userData) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="alert alert-warning" role="alert">
        No user data available
      </div>
    );
  }
  console.log(userData);
  return (
    <div className="tab-pane fade show active">
      <div className="row">
        <div className="col-md-4 text-center">
          <div className="avatar-container mb-3 position-relative">
            <img
              src={`http://localhost:8084${userData[0].avatar}`}
              alt={`${userData.firstName}'s avatar`}
              className="rounded-circle avatar-lg"
            />

            <div className="position-absolute top-0 start-50 translate-middle-x w-100 h-100">
              <label
                htmlFor="avatar-upload"
                className="d-flex justify-content-center align-items-center h-100"
                style={{ cursor: 'pointer' }}
              >
                <div className="upload-overlay rounded-circle d-flex justify-content-center align-items-center">
                  <span className="text-white">Change Photo</span>
                </div>
              </label>

              <input
                type="file"
                id="avatar-upload"
                className="d-none"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={isUploading}
              />
            </div>

            {isUploading && (
              <div className="mt-2 text-primary">Uploading...</div>
            )}

            {error && (
              <div className="mt-2 text-danger small">{error}</div>
            )}
          </div>
        </div>

        <div className="col-md-8">
          <h2 className="mb-4">Personal Information</h2>
          <div className="row">
            {[
              { label: 'Full Name', value: `${userData[0].firstName} ${userData[0].lastName || ''}` },
              { label: 'Email', value: userData[0].email }
            ].map((item, index) => (
              <div key={index} className="col-md-6 mb-3">
                <div className="card info-card">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">{item.label}</h6>
                    <p className="card-text">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default IdentitySection;