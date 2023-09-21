import pb from '@/api/pocketbase';
import { useAuth } from '@/contexts/Auth';
import getPbImageURL from '@/utils/getPbImageUrl';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import DefaultUser from '/assets/imgs/profileImg_default.png';

const kakaoLogout = async () => {
  const CLIENT_ID = import.meta.env.VITE_KAKAO_API_KEY;
  const LOGOUT_REDIRECT_URI = 'http://localhost:5173/';
  try {
    location.replace(
      `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}Pet_Bridge/home`
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
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!user && !isLoggingOut) {
      toast('로그인 후 이용해 주세요.', {
        position: 'top-right',
        icon: '🙇‍♀️',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
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

          setAvatarUrl(url);
          toast('오늘도 좋은 하루 되세요!', {
            position: 'top-right',
            icon: '🍀',
            ariaProps: {
              role: 'alert',
              'aria-live': 'polite',
            },
          });
        } catch (error) {
          console.error('Error: ', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchLikedProducts(user.id);
      setIsLoggingOut(false);
    }
  }, [user, navigate, isLoggingOut]);

  // 로그아웃 핸들러
  const handleSignOut = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      setIsLoggingOut(true);

      if (user.verified === true) {
        await kakaoLogout();
        await signOut();
      } else {
        await signOut();
      }

      toast('정상적으로 로그아웃 되었습니다.', {
        position: 'top-right',
        icon: '🐾',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      setIsLoggingOut(false);
      navigate('/home');
    }
  };

  // 회원탈퇴 핸들러
  const handleCancelMembership = async () => {
    if (window.confirm('정말로 탈퇴하시겠습니까? 🥲')) {
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

      toast('프로필이 변경되었습니다.', {
        position: 'top-right',
        icon: '🙆‍♀️',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      setIsEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="max-w-screen-pet-l mx-auto flex flex-col items-center pt-[100px] min-h-screen bg-pet-bg">
      <section className="p-8 bg-white rounded-[20px] shadow-lg w-[50%] min-w-[300px]">
        {isEditMode ? (
          <>
            <div className="text-center">
              <h2 className="sr-only">프로필 편집 모드</h2>
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
                <p className="mt-4 py-[0.3rem] w-[150px] mx-auto font-medium text-pet-black bg-primary rounded hover:bg-[#FFC71C] transition-[0.3s]">
                  프로필 사진 변경
                </p>
              </label>
              <input
                type="file"
                id="avatar"
                accept=".jpg,.png,.svg,.webp"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              <div className="mt-8 flex flex-col items-center gap-2 w-full mx-auto">
                <div className="flex items-center gap-2 mb-1 w-[250px]">
                  <p className="font-bold text-lg">username</p>
                  <input
                    type="text"
                    name="username"
                    value={updatedUser.username}
                    onChange={handleProfileChange}
                    className="border border-gray-300 p-2 w-[10rem] rounded-md"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 mb-[1rem] w-[250px]">
                  <p className="font-bold text-lg">email</p>
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    readOnly
                    className="border border-gray-300 p-2 w-[10rem] rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2 justify-end">
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 text-white bg-[#378dee] hover:bg-[#2c5491] transition-[0.3s] rounded"
              >
                저장
              </button>
              <button
                onClick={() => setIsEditMode(false)}
                className="px-4 py-2 text-white bg-pet-red border-none rounded hover:bg-[#D4452B] transition-[0.3s]"
              >
                취소
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <h2 className="sr-only">사용자 프로필</h2>
              {isLoading ? (
                <p>프로필 사진 불러오는 중...</p>
              ) : (
                <img
                  src={avatarUrl || DefaultUser}
                  alt="사용자 프로필 사진"
                  className="w-24 h-24 rounded-full inline-block"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DefaultUser;
                  }}
                />
              )}
              <div className="mt-4">
                <p className="text-xl font-bold mb-2">{user?.username}</p>
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
                className="px-4 py-2 text-white bg-pet-green rounded hover:bg-[#47A36E] transition-[0.3s]"
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
      </section>

      <section className="bg-white mt-[3rem] mx-auto w-[50%] min-w-[300px] ">
        <h2 className="font-semibold text-lg mb-[30px]">❤️ 내가 찜한 상품</h2>
        <ul className="">
          {userData && userData.expand && userData.expand.LikedProducts ? (
            userData.expand.LikedProducts.map((item, index) => (
              <li key={index} className="p-1 mb-6 shadow-md">
                <Link
                  to={`/productlist/detail/${item.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="flex items-center">
                    <img
                      src={getPbImageURL(item, 'photo')}
                      alt="상품"
                      className="w-[80px] mr-[20px]"
                    />
                    <p className="font-medium">
                      {item.title}
                      <span className="block text-xs mt-[10px] text">
                        {item.price.toLocaleString('ko-KR')} 원
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <div>데이터가 없습니다.</div>
          )}
        </ul>
      </section>
    </article>
  );
}

export default MyPage;
