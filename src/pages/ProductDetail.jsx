import useProductItem from '@/utils/useProductItem';
import { useParams } from 'react-router-dom';
import getPbImageURL from '@/utils/getPbImageUrl';
import Heart from '@/components/ProductDetail/Heart';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import pb from '@/api/pocketbase';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/Auth';
import profileImg_default from '/assets/imgs/profileImg_default.png';
import toast from 'react-hot-toast';
import minus from '/assets/icons/minus_icon.svg';
import plus from '/assets/icons/plus_icon.svg';

function ProductDetail() {
  const { user } = useAuth();
  const { productTitle } = useParams();
  const { data } = useProductItem(productTitle);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [lastReviewId, setLastReviewId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [activeSection, setActiveSection] = useState('');

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
      toast('댓글이 삭제되었습니다.', {
        position: 'top-center',
        icon: '🗞',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
    } catch (error) {
      console.error('Error deleting comment: ', error);
    }
  };

  // * 댓글 저장
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast('로그인이 필요합니다.', {
        position: 'top-center',
        icon: '🚨',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      return;
    }
    if (!comment || editingCommentId !== null) {
      toast('글을 작성해주세요.', {
        position: 'top-center',
        icon: '✒',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
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
      toast('작성 되었습니다.', {
        position: 'top-center',
        icon: '🖋',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
    } catch (error) {
      console.error('Error writing review: ', error);
    }
  };

  // * 댓글 수정
  const handleCommentEdit = (commentId) => {
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
      toast('댓글이 수정되었습니다.', {
        position: 'top-center',
        icon: '💬',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
    } catch (error) {
      console.error('Error editing comment: ', error);
    }
  };

    // * 상품 수량 관리
    const [quantity, setQuantity] = useState(1);

    // * 수량 증가 함수
    const increaseCount = () => {
      setQuantity(quantity + 1);
    };
  
    // * 수량 감소 함수
    const decreaseCount = () => {
      if (quantity > 1) {
        // 최소 1개 이상이어야 함.
        setQuantity(quantity - 1);
      }
    };

  // * 장바구니 담기

  useEffect(() => {
    if (!user) return;
    const fetchCart = async () => {
      try {
        // userCart 컬렉션에서 사용자 관련 레코드들 가져온다.
        const cartData = await pb
          .collection('userCart')
          .getFullList(`userName="${user.name}"`);
        const relatedCarts = cartData.filter(
          (item) => item.userName === user.name
        );
        console.log(relatedCarts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [user?.id]);

  // * 장바구니 저장
  const handleAddCart = async () => {
    if (!user) {
      toast('로그인이 필요합니다.', {
        position: 'top-center',
        icon: '🚨',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      return;
    }
    try {
    // 현재 사용자의 모든 장바구니 아이템 가져오기
    const userCartItems = await pb.collection('userCart').getFullList(`userId="${user.id}"`);

    // 선택한 상품이 이미 있는지 확인하기 (현재 사용자에 한함)
    const existingCartItem = userCartItems.find(item => item.productId === data.id && item.userId === user.id);
  
      // 만약 이미 존재한다면, 토스트 메시지 띄우고 함수 종료
      if (existingCartItem) {
        toast('이미 추가된 상품입니다.', {
          position: 'top-center',
          icon: '🚨',
          ariaProps: {
            role: 'alert',
            'aria-live': 'polite',
          },
        });
        return;
      }
      
      const newCartData = await pb.collection('userCart').create({
        userId: user.id,
        userName: user.name,
        productId: data.id,
        quantity: quantity,
       });
  
       console.log(newCartData);
  
       const expandedCartData = await pb
         .collection('userCart')
         .getFullList(`userName="${user.name}"`);
       console.log(expandedCartData);
       toast('상품이 추가되었습니다.', {
         position:'top-center', 
         icon:'🛒', 
         ariaProps:{
           role:'alert', 
           'aria-live':'polite'
         }
       });
     } catch (error) { 
       console.log(error); 
     }
  };
  
  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    window.scrollTo({
      top: element.offsetTop,
      behavior: 'smooth',
    });
  };

  // 스크롤 포인트 지정
  const checkScrollPosition = () => {
    const productDescription =
      document.getElementById('productDescription').offsetTop;
    const productDetails = document.getElementById('productDetails').offsetTop;
    const reviews = document.getElementById('reviews').offsetTop;

// 스크롤 포인트에 따라 상태 바꾸고
if (window.pageYOffset >= reviews) {
      setActiveSection('reviews');
    } else if (window.pageYOffset >= productDetails) {
      setActiveSection('productDetails');
    } else if (window.pageYOffset >= productDescription) {
      setActiveSection('productDescription');
    }
  };
useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);

    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

  return (
    <div className="max-w-screen-pet-l m-auto pt-3 px-5">
      <img id='productDescription' src={getPbImageURL(data, 'photo')} alt="상품사진" className="m-auto h-auto"/>
      <div className="flex justify-between">
        <div className="text-xl pt-5">{data.title}</div>
        <div className="flex mt-5 mx-3">
          <Heart productId={productTitle} />
          <div className="ml-4">
            <div className="flex items-center border">
              <button onClick={decreaseCount}>
                <img src={minus} alt="빼기" />
              </button>
              <span className="px-3">{quantity}</span>
              <button onClick={increaseCount}>
                <img src={plus} alt="추가" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mr-3 pb-4">
        {data.price ? (
          <div className="text-xl mt-4">
            {data.price.toLocaleString('ko-KR')} 원
          </div>
        ) : (
          <div className="text-xl pt-5">가격 정보 없음</div>
        )}
        <button onClick={handleAddCart} className="bg-primary w-32 h-9 rounded-xl mt-3">
          장바구니 추가
        </button>
      </div>
      <ul className="max-w-4xl h-14 bg-pet-bg font-bold flex justify-evenly border top-0 sticky">
        <li onClick={() => scrollToElement('productDescription')}
        className={`py-3 border-r text-center w-[33.3%] cursor-pointer hover:text-pet-green ${activeSection === 'productDescription' ? 'bg-primary' : '' }`}>
          상품사진
        </li>
        <li onClick={() => scrollToElement('productDetails')} 
        className={`py-3 border-r text-center w-[33.3%] cursor-pointer hover:text-pet-green ${activeSection === 'productDetails' ? 'bg-primary' : '' }`}>
          상세정보
        </li>
        <li onClick={() => scrollToElement('reviews')} 
        className={`py-3 text-center w-[33.3%] cursor-pointer hover:text-pet-green ${activeSection === 'reviews' ? 'bg-primary' : '' }`}>
          리뷰
        </li>
      </ul>
      <img id='productDetails' src={getPbImageURL(data, 'photo_detail')} alt="상품사진" className="m-auto py-4 border-b"/>
      <form id='reviews' className="py-4 mx-4 flex" onSubmit={editingCommentId ? handleEditSubmit : handleCommentSubmit}>
        <textarea type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="작성하실 리뷰를 적어주세요" className="border w-60 h-9"/>
        <button type="submit" onClick={handleCommentSubmit} className="border ml-5 bg-primary w-14 h-9 rounded-xl">
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
            <div key={index} className="bg-pet-bg h-auto flex-shrink-0 rounded-2xl shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)] mb-6">
              <div className="py-4 px-6">
                <div className="flex text-2xl items-center">
                {commentUser && commentUser.avatar ? (
                  <img src={getPbImageURL(commentUser, 'avatar')} alt={commentUser.name} className="w-11 h-11 rounded-lg"/>
                  ) : (
                  <img src={profileImg_default} alt="프로필 이미지" className="w-11 h-11 rounded-lg"/>
                  )}
                  <p className="pl-2 font-semibold">{review.name}</p>
                </div>
                <p className="text-sm font-semibold mb-5">{formattedDate}</p>
                {editingCommentId === review.id ? (
                  <>
                    <textarea type="text" value={editingContent} onChange={handleEditChange} className="w-full"/>
                    <button className="bg-primary w-14 h-9 rounded-xl" onClick={handleEditSubmit}>완료</button>
                  </>
                ) : (
                  <div>
                    <p className="text-xl">{review.contents}</p>
                    <div className="flex justify-end mt-3 gap-3">
                      {user?.name === review?.name && (
                        <>
                          <button className="bg-primary w-14 h-9 rounded-xl" onClick={() => handleCommentEdit(review.id)}>
                            수정
                          </button>
                          <button className="bg-primary w-14 h-9 rounded-xl" onClick={() => handleCommentDelete(review.id)}>
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