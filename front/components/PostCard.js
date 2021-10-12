import React, { useState, useCallback, useEffect } from 'react';
import { Card, Button, Avatar, List, Comment, Popover } from 'antd';
import PropTypes from 'prop-types';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';

import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import PostImages from './PostImages';
import FollowButton from './FollowButton';
import { REMOVE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, RETWEET_REQUEST } from '../reducers/post';

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
    //게시글, 좋아요 누른 사람중에 내가 있는지
    const id = useSelector((state) => state.user.me?.id);


  

    //좋아요
    const onLike = useCallback(() => {
      if (!id) {
        return alert('로그인이 필요합니다.');
      }
      return dispatch({
        type: LIKE_POST_REQUEST,
        data: post.id,
      });
    }, [id]);
    
    //좋아요 취소
    const onUnlike = useCallback(() => {
      if (!id) {
        return alert('로그인이 필요합니다.');
      }
      return dispatch({
        type: UNLIKE_POST_REQUEST,
        data: post.id,
      });
    }, [id]);
    const onToggleComment = useCallback(() => {
      setCommentFormOpened((prev) => !prev);
    }, []);
  
    //삭제
    const onRemovePost = useCallback(() => {
      if (!id) {
        return alert('로그인이 필요합니다.');
      }
      return dispatch({
        type: REMOVE_POST_REQUEST,
        data: post.id,
      });
    }, [id]);
  
    //리트윗
    const onRetweet = useCallback(() => {
      if (!id) {
        return alert('로그인이 필요합니다.');
      }
      return dispatch({
        type: RETWEET_REQUEST,
        data: post.id,
      });
    }, [id]);




  const liked = post.Likers.find((v) => v.id === id);
  return (
    <CardWrapper key={post.id}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
               //배열에 jsx 넣을 시에는 key를 넣어줘야함
          <RetweetOutlined key="retweet"onClick={onRetweet} />,
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnLike} />
            : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={(
              <Button.Group>
                {id && post.UserId === id
                  ? (
                    <>
                      <Button>수정</Button>
                      <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                    </>
                  )
                  : <Button>신고</Button>}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        //리트윗 표시
        title = {post.RetweetId ? `${post.User.nickname}님이 리트윗 하셨습니다.` : null}
        extra={<FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet
        ? (
          <Card
            cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
          > 
            <Card.Meta
              avatar={<Avatar>{post.Retweet.User.nickname[0]}</Avatar>}
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
          />
            </Card>
           )
        : (
          <Card.Meta
            avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
            title={post.User.nickname}
            description={<PostCardContent postData={post.content} />}
          />
        )}
      </Card>
      {commentFormOpened && (
        <>
          {/* 어떤 게시글에 댓글을 달 건지 알아야해서 post 보냄, 게시글의 id */}
          <CommentForm post={post} />
          <List
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}//댓글 작성한 유저
                  avatar={(
                    <Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}>
                      <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                    </Link>
                  )}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </CardWrapper>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    UserId: PropTypes.number,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers : PropTypes.arrayOf(PropTypes.object),
    Retweet : PropTypes.objectOf(PropTypes.any);
  }).isRequired,
};

export default PostCard;