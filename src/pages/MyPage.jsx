import pb from '@/api/pocketbase';
import { useAuth } from '@/contexts/Auth';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import MyPageLikedProductsSection from '../components/Mypage/MyPageLikedProductsSection';
import MyPageProfileSection from '../components/Mypage/MyPageProfileSection';
import DefaultUser from '/assets/imgs/profileImg_default.png';
import { Helmet } from 'react-helmet-async';

const kakaoLogout = async () => {
  const CLIENT_ID = import.meta.env.VITE_KAKAO_API_KEY;
  const LOGOUT_REDIRECT_URI = import.meta.env.VITE_KAKAO_LOGOUT_REDIRECT_URI;
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
            id: 'welcomeMessage',
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

  const handleCancelMembership = async () => {
    if (window.confirm('정말로 탈퇴하시겠습니까? 🥲')) {
      await cancelMembership(user.id);
      toast('회원탈퇴가 완료되었습니다.', {
        position: 'top-right',
        icon: '😿',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      navigate('/home');
    }
  };

  const [isEditMode, setIsEditMode] = useState(false);

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

  const handleProfileChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      const newImageUrl = URL.createObjectURL(e.target.files[0]);
      setAvatarUrl(newImageUrl);

      setUpdatedUser({
        ...updatedUser,
        avatar: newImageUrl,
        avatarFile: e.target.files[0],
      });
    }
  };
  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('username', updatedUser.username);
      formData.append('email', updatedUser.email);

      if (updatedUser.avatarFile) {
        formData.append('avatar', updatedUser.avatarFile);
      }

      await updateUser(user.id, formData);

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
    <>
      <Helmet>
        <title>펫:브릿지 - 마이페이지</title>
      </Helmet>
      <article className="max-w-screen-pet-l mx-auto flex flex-col items-center pt-[100px] min-h-screen bg-pet-bg">
        <MyPageProfileSection
          isEditMode={isEditMode}
          updatedUser={updatedUser}
          avatarUrl={avatarUrl}
          isLoading={isLoading}
          handleProfileChange={handleProfileChange}
          handleAvatarChange={handleAvatarChange}
          handleSaveProfile={handleSaveProfile}
          setIsEditMode={setIsEditMode}
          handleSignOut={handleSignOut}
          handleCancelMembership={handleCancelMembership}
        />
        <MyPageLikedProductsSection
          userData={userData}
          isLoading={isLoading}
          handleSignOut={handleSignOut}
          handleCancelMembership={handleCancelMembership}
        />
      </article>
    </>
  );
}

export default MyPage;
