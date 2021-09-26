import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch} from 'react-redux';
import { Button, Card, Popover,  Avatar, List , Comment} from 'antd';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone } from '@ant-design/icons';



import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { REMOVE_POST_REQUEST } from '../reducers/post';




const PostCard = ( { post }) => {
    const  dispatch = useDispatch()
    const { removePostLoading } =  useSelector((state) => state.post);
    const [liked, setLiked] = useState(false);
    const [ commentFormOpened, setCommentFormOpened] = useState(false);
    const onToggleLike = useCallback(() => {
        //이전 데이터 기반으로 다음 데이터를 만듦
        //true -> false, false -> true
        setLiked((prev) => !prev);
           },[]);
    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);           

    const onRemovePost = useCallback(() => {
        dispatch = ({
            type : REMOVE_POST_REQUEST,
            data: post.id,
        });
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
                                    <Button type="danger"  loading ={removePostLoading} onClick={onRemovePost}>삭제</Button>
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
                    description={<PostCardContent postData={post.content} />}
                    />
            </Card>
            {commentFormOpened && (
                <div>
                    {/* 어떤 게시글에 댓글을 달 건지 알아야해서 post 보냄, 게시글의 id */}
                   <CommentForm post={post} />
                   <List
                    header={`${post.Comments.length}개의 댓글`}
                    itemLayout="horizontal"
                    dataSource={post.Comments}
                    renderItem={(item) => (
                        <li>
                            <Comment
                                author = {item.User.nickname}//댓글 작성한 유저
                                avatar = {<Avatar>{item.User.nickname[0]}</Avatar>}
                                content = {item.content}
                            />
                        </li>
                    )}
                   
                   />
                </div>
            )}
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