import { useAuth } from '@/contexts/Auth';
import DefaultUser from '/assets/imgs/defaultUser.png'; // 기본 사용자 이미지
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import pb from '@/api/pocketbase';
import getPbImageURL from '@/utils/getPbImageUrl';

const kakaoLogout = async () => {
  const CLIENT_ID = import.meta.env.VITE_KAKAO_API_KEY;
  const LOGOUT_REDIRECT_URI = 'http://localhost:5173/';
  try {
    location.replace(
      `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

function MyPage() {
  const { user, signOut, cancelMembership, updateUser } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user) {
      // alert('로그인이 필요합니다.');
      navigate('/signin');
    } else {
      const fetchLikedProducts = async () => {
        try {
          const data = await pb
            .collection('users')
            .getOne(user.id, { expand: 'LikedProducts' });
          setUserData(data);
          console.log(data);
        } catch (error) {
          console.error('Error: ', error);
        }
      };
      fetchLikedProducts(user.id);
    }
  }, [user, navigate]);

  // 로그아웃 핸들러
  const handleSignOut = async () => {
    await signOut();
    await kakaoLogout();
    navigate('/home');
  };

  // 회원탈퇴 핸들러
  const handleCancelMembership = async () => {
    if (window.confirm('정말로 탈퇴하시겠습니까?')) {
      await cancelMembership(user.id);
      navigate('/home');
    }
  };

  // 프로필 수정 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);

  // 변경할 사용자 정보 상태
  const [updatedUser, setUpdatedUser] = useState({
    username: user?.username,
    email: user?.email,
    avatar: DefaultUser,
    avatarFile: null,
  });

  useEffect(() => {
    setUpdatedUser({
      username: user?.username || '',
      email: user?.email || '',
      avatar: user?.avatar || DefaultUser,
    });
  }, [user]);

  // 프로필(이미지X) 변경 핸들러
  const handleProfileChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };
  // 프로필(이미지) 변경 핸들러
  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setUpdatedUser({
        ...updatedUser,
        avatar: URL.createObjectURL(e.target.files[0]),
        avatarFile: e.target.files[0],
      });
    }
  };
  // 프로필 변경정보 저장 핸들러
  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('username', updatedUser.username);
      formData.append('email', updatedUser.email);

      if (updatedUser.avatarFile) {
        formData.append('avatar', updatedUser.avatarFile);
      }

      // 사용자 정보 업데이트
      await updateUser(user.id, formData);

      // 업데이트된 사용자 정보 다시 불러오기
      const refreshedUser = await pb.collection('users').get(user.id);
      const avatarUrl = pb.files.getUrl(refreshedUser, refreshedUser.avatar);

      setUpdatedUser({
        ...refreshedUser,
        avatar: avatarUrl || DefaultUser,
        avatarFile: null,
      });

      alert('저장 완료!');
      setIsEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded shadow-lg">
        {isEditMode ? (
          <>
            <div className="min-w-[18.75rem]">
              <label htmlFor="avatar" className="cursor-pointer">
                <img
                  src={updatedUser.avatar ? updatedUser.avatar : DefaultUser}
                  alt="사용자 프로필"
                  className="w-24 h-24 rounded-full mb-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DefaultUser;
                  }}
                />
              </label>
              <input
                type="file"
                id="avatar"
                accept=".jpg,.png,.svg,.webp"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              <div className="">
                <input
                  type="text"
                  name="username"
                  value={updatedUser.username}
                  onChange={handleProfileChange}
                  className="border border-gray-300 p-2 mb-[1rem] w-[10rem] rounded-md"
                />
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  readOnly
                  className="border border-gray-300 p-2 w-[10rem] rounded-md"
                />
              </div>
            </div>
            <div className="flex gap-[1rem] mt-3">
              <button
                onClick={handleSaveProfile}
                className="px-[1.5rem] py-[0.5rem] text-white bg-blue-500 hover:bg-blue-600 rounded"
              >
                저장
              </button>
              <button
                onClick={() => setIsEditMode(false)}
                className="px-[1.5rem] py-[0.5rem] text-white bg-red-500 hover:bg-red-600 rounded"
              >
                취소
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between gap-5">
              <img
                src={updatedUser.avatar}
                alt="사용자 프로필"
                className="w-24 h-24 rounded-full mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DefaultUser;
                }}
              />
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">{user?.username}</h2>
                <span className="text-gray-500 mb-6 block">{user?.email}</span>
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-2 w-full">
              <button
                type="button"
                onClick={() => setIsEditMode(true)}
                className="px-4 py-2 text-pet-black bg-primary rounded hover:bg-blue-600"
              >
                프로필 변경
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className="px-4 py-2  text-white bg-pet-green rounded hover:bg-green-600"
              >
                로그아웃
              </button>
              <button
                type="button"
                onClick={handleCancelMembership}
                className="px-4 py-2 text-white bg-pet-red border-none rounded hover:bg-red-500"
              >
                회원탈퇴
              </button>
            </div>
          </>
        )}
      </div>

      <div className="bg-white p-[10%] mt-[3rem] mx-auto w-[80%] h-[20rem] flex items-center justify-center">
        <h3 className="font-semibold text-xl text-center"></h3>
        <div className="test">
          좋아요 목록 / 찜한 보호소...
          {userData &&
            userData.expand.LikedProducts.map((item, index) => (
              <div key={index} className="">
                <img
                  src={getPbImageURL(item, 'photo')}
                  alt="상품"
                  className="w-20 h-16 bg-black"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
