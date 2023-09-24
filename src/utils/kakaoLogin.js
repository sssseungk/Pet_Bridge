import pb from '@/api/pocketbase';

const kakaoLogin = async () => {
  try {
    const user = await pb.collection('users').authWithOAuth2({
      provider: 'kakao',
    });

    const { username: name, email } = user.meta;

    const updateUser = {
      name,
      username: email.split('@')[0],
    };

    return await pb.collection('users').update(user.record.id, updateUser);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default kakaoLogin;
