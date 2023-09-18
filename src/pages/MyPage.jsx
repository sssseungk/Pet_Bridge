import pb from '@/api/pocketbase';
import { useAuth } from '@/contexts/Auth';
import getPbImageURL from '@/utils/getPbImageUrl';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DefaultUser from '/assets/imgs/defaultUser.png'; // 기본 사용자 이미지

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
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    } else {
      const fetchLikedProducts = async () => {
        try {
          setIsLoading(true);
          const data = await pb
            .collection('users')
            .getOne(user.id, { expand: 'LikedProducts' });
          setUserData(data);

          const refreshedUser = await pb.collection('users').getOne(user.id);
          const url = pb.files.getUrl(refreshedUser, refreshedUser.avatar);

          // avatarUrl 상태 업데이트
          setAvatarUrl(url);
        } catch (error) {
          console.error('Error: ', error);
        } finally {
          setIsLoading(false); // 데이터 로딩 완료
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
    avatar: avatarUrl || DefaultUser,
    avatarFile: null,
  });

  useEffect(() => {
    setUpdatedUser({
      username: user?.username || '',
      email: user?.email || '',
      avatar: user?.avatar,
    });
  }, [user]);

  // 프로필(이미지X) 변경 핸들러
  const handleProfileChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };
  // 프로필(이미지) 변경 핸들러
  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      const newImageUrl = URL.createObjectURL(e.target.files[0]);
      setAvatarUrl(newImageUrl); // avatarUrl 상태 업데이트

      setUpdatedUser({
        ...updatedUser,
        avatar: newImageUrl, // 새로운 이미지 URL 사용
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
      const refreshedUser = await pb.collection('users').getOne(user.id);
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
    <div className="max-w-4xl mx-auto flex flex-col items-center mt-[100px] min-h-screen bg-pet-bg">
      <div className="p-8 bg-white rounded-[20px] shadow-lg w-[50%] min-w-[300px]">
        {isEditMode ? (
          <>
            <div className="min-w-[18.75rem]">
              <label htmlFor="avatar" className="cursor-pointer">
                <img
                  src={avatarUrl ? avatarUrl : updatedUser.avatar}
                  alt="사용자 프로필"
                  className="w-24 h-24 rounded-full inline-block"
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
            <div className="text-center">
              {isLoading ? (
                <div>Loading...</div> // 데이터가 로드되는 동안 표시할 요소 (예: 로딩 스피너)
              ) : (
                <img
                  src={avatarUrl || DefaultUser}
                  alt="사용자 프로필"
                  className="w-24 h-24 rounded-full inline-block"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DefaultUser;
                  }}
                />
              )}
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">{user?.username}</h2>
                <span className="text-gray-500 mb-6 block">{user?.email}</span>
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-2 w-full">
              <button
                type="button"
                onClick={() => setIsEditMode(true)}
                className="px-4 py-2 text-pet-black bg-primary rounded hover:bg-[#FFC71C] transition-[0.3s]"
              >
                프로필 변경
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className="px-4 py-2  text-white bg-pet-green rounded hover:bg-[#47A36E] transition-[0.3s]"
              >
                로그아웃
              </button>
              <button
                type="button"
                onClick={handleCancelMembership}
                className="px-4 py-2 text-white bg-pet-red border-none rounded hover:bg-[#D4452B] transition-[0.3s]"
              >
                회원탈퇴
              </button>
            </div>
          </>
        )}
      </div>

      <div className="bg-white p-[10%] mt-[3rem] mx-auto w-[80%] h-[20rem] flex items-center justify-center">
        <h3 className="font-semibold text-xl text-center"></h3>
        <div className="text-center">
          좋아요 목록
          <div className="flex">
            {userData && userData.expand && userData.expand.LikedProducts ? (
              userData.expand.LikedProducts.map((item, index) => (
                <Link
                  key={index}
                  to={`/productlist/detail/${item.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="">
                    <img
                      src={getPbImageURL(item, 'photo')}
                      alt="상품"
                      className="w-[100px]"
                    />
                    <p>{item.title}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div>데이터가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
