import useProductItem from "@/utils/useProductItem";
import { useParams } from "react-router-dom";
import { getPbImageURL } from "@/utils/getPbImageUrl";
import Heart from "@/components/ProductDetail/Heart";
import CountButton from "@/components/ProductDetail/CountButton";
import { Link } from 'react-router-dom';    
import { useState } from "react";
import { pb } from '@/api/pocketbase'; 
import { useEffect } from "react";


function ProductDetail() {
    const user = JSON.parse(window.localStorage.getItem('pocketbase_auth'));

    const { productTitle } = useParams();
    const { data } = useProductItem(productTitle);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);
    const [lastReviewId, setLastReviewId] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingContent, setEditingContent] = useState('');

    useEffect(() => {
      let isCancelled = false;

      // * 리뷰 연결
      const fetchReviews = async () => {
        try {
          const reviewsData = await pb.collection('reviews').getFullList({expand: 'users'});
          if (isCancelled) return;  
          const relatedReviews = reviewsData.filter(review => review.product_title === data.title);
          const latestReviewId = relatedReviews.length > 0 ? relatedReviews[relatedReviews.length - 1].id : null;
          
          if (latestReviewId !== lastReviewId) {
            setLastReviewId(latestReviewId);
            setReviews(relatedReviews); 
          }
        }
        catch (error) {
          if (!isCancelled) { 
            console.error("Error fetching reviews: ", error);
          }
        }
      };
    
      fetchReviews();
    
      return () => {
        isCancelled = true;
      };
    }, [data.title, lastReviewId]); 

      // * 삭제 기능
      const handleCommentDelete = async (commentId) => {
        const commentToDelete = reviews.find(review => review.id === commentId);

        if (!user || user.model.name !== commentToDelete.name){
          alert('댓글 삭제 권한이 없습니다.');
          return;
        }

        try {
          await pb.collection('reviews').delete(commentId);

          // 업데이트된 리뷰 목록 다시 가져오기
          const updatedReviewsData = await pb.collection('reviews').getFullList({expand:'users'});
          const relatedReviews =
            updatedReviewsData.filter(review => review.product_title === data.title);
          
          setReviews(relatedReviews);
          
          alert('댓글이 삭제되었습니다!');
        }
        catch(error) {
            console.error("Error deleting comment: ", error);
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
          await pb.collection('reviews').create({
            name: user.model.name,
            contents: comment,
            product_title: data.title,
            postdate: currentDate,
            users: user.model.id
          });
          
          const updatedReviewsData = await pb.collection('reviews').getFullList({ expand: 'users' });
          const relatedReviews = updatedReviewsData.filter(review => review.product_title === data.title);
          setReviews(relatedReviews);
          setComment('');
          alert('작성되었습니다!');
      }
      catch(error) {
          console.error("Error writing review: ", error);
      }
      };


      // * 댓글 수정
      const handleCommentEdit = (commentId) => {
        if (!user || user.model.name !== reviews.find(review => review.id === commentId).name) {
          alert('댓글 수정 권한이 없습니다.');
          return;
        }

        alert('댓글을 수정하세욥!')
        setEditingCommentId(commentId);
        setEditingContent(reviews.find(review => review.id === commentId).contents);
      };
      const handleEditChange = (e) => {
        setEditingContent(e.target.value);
      };
      const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
          await pb.collection('reviews').update(editingCommentId, { contents: editingContent });

          // 업데이트된 리뷰 목록 가져오기
          const updatedReviewsData = await pb.collection('reviews').getFullList({expand:'users'});
          const relatedReviews =
            updatedReviewsData.filter(review => review.product_title === data.title);
      
          setReviews(relatedReviews);
      
          // 입력창 초기화
          setEditingCommentId(null);
          setEditingContent('');
      
          alert('댓글이 수정되었습니다!');
        } catch(error) {
            console.error("Error editing comment: ", error);
        }
      };
      
    return (
    <div className="max-w-4xl m-auto pt-3 px-5">
      <img src={getPbImageURL(data,'photo')} alt="상품사진" className=" m-auto h-64" />
      <div className="text-xl pt-5">{data.title}</div>
      <div className="flex justify-between">
      {data.price ? (<div className="text-xl pt-5">{data.price.toLocaleString('ko-KR')} 원</div>
      ) : (<div className="text-xl pt-5">가격 정보 없음</div>)}
        <div className="flex items-center gap-4">
          <button>
            <Heart/>
          </button>
          <CountButton/>
        </div>   
      </div>
      <div className='m-auto h-[1px] bg-black mt-4'></div>
      <img src={getPbImageURL(data,'photo_detail')} alt="상품사진" className=" m-auto pt-4" />
      <div className='m-auto h-[1px] bg-black mt-4 mb-2'></div>
      <form className="py-4 mx-4" onSubmit={editingCommentId ? handleEditSubmit : handleCommentSubmit}>
        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="작성하실 리뷰를 적어주세요" className="border w-60 h-9" />
        <button type="submit" onClick={handleCommentSubmit} className="border ml-5 bg-primary w-14 h-9 rounded-xl" >작성</button>
      </form>
      {reviews.slice().reverse().map((review, index) => {
        const reviewDate = new Date(review.postdate);
        const formattedDate = reviewDate.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).replace(/\. /g, '.'); 

        const user = review.expand && review.expand.users;
        return (
          <div key={index} className="bg-pet-bg h-auto flex-shrink-0 rounded-2xl shadow-[2px_2px_4px_3px_rgba(0,0,0,0.25)] mb-6">
            <div className="py-4 px-6">
            <div className="flex text-2xl items-center">
              {user ? (
                <img src={getPbImageURL(user,'avatar')} className="w-11 h-11 rounded-lg"/>
              ) : (
                <img src="/path/to/default/image.jpg" className="w-11 h-11 rounded-lg"/>
              )}
              <p className="pl-2 font-semibold">
                {review.name || '알 수 없는 사용자'}
              </p>
            </div>
            <p className="text-sm font-semibold mb-5">{formattedDate}</p>
              {editingCommentId === review.id ? (
                <>
                  <textarea type="text" value={editingContent} onChange={handleEditChange} className="w-full"/>
                  <button onClick={handleEditSubmit} className="bg-primary w-14 h-9 rounded-xl ">완료</button>
                </>
              ) : (
                <div>
                  <p className="text-xl">{review.contents}</p>
                  <div className="flex justify-end mt-3 gap-3">
                    <button onClick={() => handleCommentDelete(review.id)} className="bg-primary w-14 h-9 rounded-xl">삭제</button>
                    <button onClick={() => handleCommentEdit(review.id)} className="bg-primary w-14 h-9 rounded-xl">수정</button>
                  </div>

                </div>
              )}
            </div>
          </div>
        )
      }
      )}
      <Link to={`/cart`} >
        <button className="w-full m-auto h-12 bg-primary rounded-lg items-center mb-3 text-base bottom-16 left-0 right-0 sticky">
          장바구니
        </button>
      </Link>
    </div>
  )
}

export default ProductDetail