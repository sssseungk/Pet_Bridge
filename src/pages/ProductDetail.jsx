
import useProductItem from '@/utils/useProductItem';
import { useParams } from 'react-router-dom';
import getPbImageURL from '@/utils/getPbImageUrl';
import Heart from '@/components/ProductDetail/Heart';
import CountButton from '@/components/ProductDetail/CountButton';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import pb from '@/api/pocketbase';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/Auth';
import profileImg_default from '/assets/imgs/profileImg_default.png';

function ProductDetail() {
  const { user } = useAuth();
  const { productTitle } = useParams();
  const { data } = useProductItem(productTitle);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [lastReviewId, setLastReviewId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    // * 리뷰 연결
    const fetchReviews = async () => {
      try {
        const reviewsData = await pb
          .collection('reviews')
          .getFullList({ expand: 'users' });
        const relatedReviews = reviewsData.filter(
          (review) => review.product_title === data.title
        );
        const latestReviewId =
          relatedReviews.length > 0
            ? relatedReviews[relatedReviews.length - 1].id
            : null;

        if (latestReviewId !== lastReviewId) {
          setLastReviewId(latestReviewId);
          setReviews(relatedReviews);
        }
      } catch (error) {
        console.error('Error fetching reviews: ', error);
      }
    };

    fetchReviews();
  }, [data.title, lastReviewId]);

  // * 삭제 기능
  const handleCommentDelete = async (commentId) => {
    const commentToDelete = reviews.find((review) => review.id === commentId);

    if (!user || user.name !== commentToDelete.name) {
      alert('댓글 삭제 권한이 없습니다.');
      return;
    }

    try {
      await pb.collection('reviews').delete(commentId);

      // 업데이트된 리뷰 목록 다시 가져오기
      const updatedReviewsData = await pb
        .collection('reviews')
        .getFullList({ expand: 'users' });
      const relatedReviews = updatedReviewsData.filter(
        (review) => review.product_title === data.title
      );

      setReviews(relatedReviews);

      alert('댓글이 삭제되었습니다!');
    } catch (error) {
      console.error('Error deleting comment: ', error);
    }
  };

  // * 댓글 저장
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!comment || editingCommentId !== null) {
      alert('글을 작성해주세요');
      return;
    }

    // 리뷰 데이터 포켓베이스에 저장
    try {
      const currentDate = new Date();

      const newReview = await pb.collection('reviews').create({
        name: user.name,
        contents: comment,
        product_title: data.title,
        postdate: currentDate,
        users: user.id,
      });
      const expandedNewReview = await pb
        .collection('reviews')
        .getOne(newReview.id, { expand: 'users' });
      // 사용자 이미지까지 가져오기 위해 데이터 확장
      setReviews((prevReviews) => [...prevReviews, expandedNewReview]);
      setComment('');
      alert('작성되었습니다!');
    } catch (error) {
      console.error('Error writing review: ', error);
    }
  };

  // * 댓글 수정
  const handleCommentEdit = (commentId) => {
    if (
      !user ||
      user?.name !== reviews.find((review) => review.id === commentId).name
    ) {
      alert('댓글 수정 권한이 없습니다.');
      return;
    }
    setEditingCommentId(commentId);
    setEditingContent(
      reviews.find((review) => review.id === commentId).contents
    );
  };
  const handleEditChange = (e) => {
    setEditingContent(e.target.value);
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await pb
        .collection('reviews')
        .update(editingCommentId, { contents: editingContent });

      // 업데이트된 리뷰 목록 가져오기
      const updatedReviewsData = await pb
        .collection('reviews')
        .getFullList({ expand: 'users' });
      const relatedReviews = updatedReviewsData.filter(
        (review) => review.product_title === data.title
      );

      setReviews(relatedReviews);

      // 입력창 초기화
      setEditingCommentId(null);
      setEditingContent('');

      alert('댓글이 수정되었습니다!');
    } catch (error) {
      console.error('Error editing comment: ', error);
    }
  };

  // * 장바구니 담기
  const handleAddCart = async (e) => {
    e.preventDefault();
    try {
      // 현재 사용자 데이터 가져오기
      const userData = await pb.collection('users').getOne(user.id);
      // 이미 담겨있는지 확인
      if (userData.AddCart.includes(data.id)) {
        alert('이미 장바구니에 있습니다.');
        return; // 이미 담겨있으면 더 이상 처리하지 않음
      }
      // 기존의 장바구니 아이템들에 새로운 아이템 추가
      const updatedCart = [...userData.AddCart, data.id];
      console.log(data);
      // 업데이트된 장바구니로 사용자 데이터 업데이트
      const userUpdatedData = await pb
        .collection('users')
        .update(user.id, { AddCart: updatedCart });
      console.log(userUpdatedData);
      alert('장바구니에 추가되었습니다.');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl m-auto pt-3 px-5">
      <img
        src={getPbImageURL(data, 'photo')}
        alt="상품사진"
        className=" m-auto h-auto"
      />
      <div className="flex justify-between">
        <div className="text-xl pt-5">{data.title}</div>
        <div className="flex mt-5 mx-3">
          <Heart productId={productTitle} />
          <div className="ml-4">
            <CountButton />
          </div>
        </div>
      </div>

      <div className="flex justify-between mr-3">
        {data.price ? (
          <div className="text-xl mt-4">
            {data.price.toLocaleString('ko-KR')} 원
          </div>
        ) : (
          <div className="text-xl pt-5">가격 정보 없음</div>
        )}
        <button
          onClick={handleAddCart}
          className="bg-primary w-32 h-9 rounded-xl mt-3"
        >
          장바구니 추가
        </button>
      </div>

      <div className="m-auto h-[1px] bg-black mt-4"></div>
      <img
        src={getPbImageURL(data, 'photo_detail')}
        alt="상품사진"
        className=" m-auto pt-4"
      />
      <div className="m-auto h-[1px] bg-black mt-4 mb-2"></div>
      <form
        className="py-4 mx-4 flex"
        onSubmit={editingCommentId ? handleEditSubmit : handleCommentSubmit}
      >
        <textarea
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="작성하실 리뷰를 적어주세요"
          className="border w-60 h-9"
        />
        <button
          type="submit"
          onClick={handleCommentSubmit}
          className="border ml-5 bg-primary w-14 h-9 rounded-xl"
        >
          작성
        </button>
      </form>
      {reviews
        .slice()
        .reverse()
        .map((review, index) => {
          const reviewDate = new Date(review.postdate);
          const formattedDate = reviewDate
            .toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
            .replace(/\. /g, '.');

          const commentUser = review.expand && review.expand.users;
          return (
            <div
              key={index}
              className="bg-pet-bg h-auto flex-shrink-0 rounded-2xl shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)] mb-6"
            >
              <div className="py-4 px-6">
                <div className="flex text-2xl items-center">
                  <img
                    src={
                      commentUser.avatar && getPbImageURL(commentUser, 'avatar')
                        ? getPbImageURL(commentUser, 'avatar')
                        : profileImg_default
                    }
                    alt={getPbImageURL(commentUser, 'name')}
                    className="w-11 h-11 rounded-lg"
                  />

                  <p className="pl-2 font-semibold">{review.name}</p>
                </div>
                <p className="text-sm font-semibold mb-5">{formattedDate}</p>
                {editingCommentId === review.id ? (
                  <>
                    <textarea
                      type="text"
                      value={editingContent}
                      onChange={handleEditChange}
                      className="w-full"
                    />
                    <button
                      className="bg-primary w-14 h-9 rounded-xl"
                      onClick={handleEditSubmit}
                    >
                      완료
                    </button>
                  </>
                ) : (
                  <div>
                    <p className="text-xl">{review.contents}</p>
                    <div className="flex justify-end mt-3 gap-3">
                      {user?.name === review?.name && (
                        <>
                          <button
                            className="bg-primary w-14 h-9 rounded-xl"
                            onClick={() => handleCommentEdit(review.id)}
                          >
                            수정
                          </button>
                          <button
                            className="bg-primary w-14 h-9 rounded-xl"
                            onClick={() => handleCommentDelete(review.id)}
                          >
                            삭제
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      <Link to={`/cart`}>
        <button className="w-full m-auto h-12 bg-primary rounded-lg items-center mb-3 text-base bottom-16 left-0 right-0 sticky">
          장바구니
        </button>
      </Link>
    </div>
  );
}

export default ProductDetail;