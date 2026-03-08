'use client'

import { getUser } from "@/services/auth";
import { getUserInformation, updateUserInformation } from "@/services/userInformation";
import React, { useState } from "react";
import { FaEdit, FaUser, FaTimes, FaCheck } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [userInformation, setUserInformation] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        
        if (userData?.id) {
          const userInfoResponse = await getUserInformation(userData.id);
          const userInfo = (userInfoResponse as { data: any }).data;
          setUserInformation(userInfo);
          setFormData({
            name: userInfo?.name || '',
            email: userInfo?.email || '',
            phone: userInfo?.phone || ''
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: userInformation?.name || '',
      email: userInformation?.email || '',
      phone: userInformation?.phone || ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user?.id) {
        await updateUserInformation(user.id, formData);
        const updatedInfo = await getUserInformation(user.id);
        setUserInformation((updatedInfo as { data: any }).data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <div className="text-2xl font-bold mb-4 flex items-center space-x-5 gap-2">
          <div className="flex space-x-2 items-center">
            <FaUser className="text-blue-700" />
            <span>User Profile</span>
          </div>
          {!isEditing ? (
            <FaEdit
              onClick={handleEditClick}
              className="text-gray-600 text-xl cursor-pointer hover:text-blue-500"
              title="Edit Profile"
            />
          ) : (
            <div className="flex space-x-2">
              <FaCheck
                onClick={handleSubmit}
                className="text-green-600 text-xl cursor-pointer hover:text-green-700"
                title="Save Changes"
              />
              <FaTimes
                onClick={handleCancel}
                className="text-red-600 text-xl cursor-pointer hover:text-red-700"
                title="Cancel"
              />
            </div>
          )}
        </div>
      </div>
      
      {!isEditing ? (
        <div className="bg-gray-50 p-4 rounded shadow flex flex-col space-y-5">
          <p className="text-lg">
            <strong className="mr-2">Name:</strong> {userInformation?.name}
          </p>
          <p className="text-lg">
            <strong className="mr-2">Email:</strong> {userInformation?.email}
          </p>
          <p className="text-lg">
            <strong className="mr-2">Phone:</strong> {userInformation?.phone}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded shadow flex flex-col space-y-5">
          <div className="flex items-center">
            <strong className="mr-2 w-20">Name:</strong>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="flex-1 p-2 border rounded"
            />
          </div>
          <div className="flex items-center">
            <strong className="mr-2 w-20">Email:</strong>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="flex-1 p-2 border rounded"
            />
          </div>
          <div className="flex items-center">
            <strong className="mr-2 w-20">Phone:</strong>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="flex-1 p-2 border rounded"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default UserProfile;