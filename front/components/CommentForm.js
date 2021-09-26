import { Form, Input, Button } from 'antd';
import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch} from 'react-redux';

import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';


const CommentForm = ({ post }) => {
    const dispath= useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const { addCommentDome, addCommentLoading} = useSelector((state) => state.post);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');


    useEffect(() => {
        if(addCommentDone){
            setCommentText('');
        }
     }, [addCommentDone]);
 


    const onSubmitComment = useCallback(() => { 
        console.log(post.id, commentText); //게시글 아이디 밑에 댓글을 달 예정이라
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data : { content : commentText, postId : post.id, userId, id},
        });
    }, [commentText, id]);
    return (
        <Form onFinish ={onSubmitComment}>
            <Form.Item style={{ position: 'relative', margin :0 }}>
                <Input.TextArea valye={commentText} onChange={onChangeCommentText} rows={4}/>
                <Button 
                style = {{ position : 'absolute', right : 0, bottom : -40 , zIndex :1 }}
                type="primary" 
                htmlType="submit"
                loading={addCommentLoading}
                >
                    삐약</Button>
            </Form.Item>
        </Form>
    );
};

CommentForm.propTypes ={
    post : PropTypes.object.isRequired,
};

export default CommentForm;