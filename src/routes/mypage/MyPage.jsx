import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms/userAtom';
import { useEffect, useState } from 'react';
import { updateUser } from '../../api/user/user';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const user = useRecoilValue(userState);
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.profileImageUrl || '');
  const token = localStorage.getItem('token');
  const nivagate = useNavigate();

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setPreviewUrl(
        `${import.meta.env.VITE_API_BASE_URL}${user.profileImageUrl}`
      );
    } else {
      alert('로그인 후 이용해주세요.');
      nivagate('/');
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nickname', nickname);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    console.log('Form data:', formData);
    console.log('Token:', token);
    try {
      const updatedUser = await updateUser(formData, token);
      console.log('Updated user:', updatedUser);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div>
      <h1>My Details</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-start">
        <label htmlFor="userImage" className="cursor-pointer">
          <img
            src={previewUrl}
            alt="User Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          Change Profile Image
          <input
            type="file"
            id="userImage"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Change nickname"
          className="border px-2 py-1"
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
