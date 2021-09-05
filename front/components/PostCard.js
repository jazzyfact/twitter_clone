import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button, Card, Popover,  Avatar } from 'antd';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone } from '@ant-design/icons';
import PostImages from './PostImages';





const PostCard = ( {post }) => {
    const [liked, setLiked] = useState(false);
    const [ commentFormOpened, setCommentFormOpened] = useState(false);


    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev);
           },[]);
    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);           

    const id = useSelector((state) => state.user.me && state.user.me.id);
    // const id = useSelector((state) => state.user.me?.id);
    // const id = me && me.id;
    //옵셔널 체이닝 연산자 
    // const id = me?.id;
    return(
        <div style={{ marginBottom : 20 }}>
            <Card
                cover = {post.Images[0] && <PostImages images={post.Images} />}
                actions= {[
                    //배열에 jsx 넣을 시에는 key를 넣어줘야함
                    <RetweetOutlined key="retweet"/>,
                    liked
                        ? <HeartTwoTone twoToneColor ="#eb2f96" key="heart" onClick={onToggleLike}/>
                        : <HeartOutlined key="heart"  onClick={onToggleLike}/>,
                    <MessageOutlined key="comment" onClick={onToggleComment}/>,
                    <Popover key="more" content={(
                       <Button.Group>
                            {id && post.User.id === id
                            ? (
                                <>
                                    <Button>수정</Button>
                                    <Button type="danger">삭제</Button>
                                </>
                            )
                                : <Button>신고</Button>}
                        </Button.Group>
                    )}>
                        <EllipsisOutlined />
                    </Popover>,
                ]}
            >
                <Card.Meta
                    avatar ={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title ={post.User.nickname}
                    description={post.content}
                    />
            </Card>
            {commentFormOpened && (
                <div>
                    댓글 부분
                </div>
            )}
             {/* <CommentForm/>
             <Comments /> */}
        </div>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
      id: PropTypes.number,
      User: PropTypes.object,
      content: PropTypes.string,
      createdAt: PropTypes.object,
      Comments: PropTypes.arrayOf(PropTypes.any),
      Images: PropTypes.arrayOf(PropTypes.any),
    }),
  };
  

export default PostCard;