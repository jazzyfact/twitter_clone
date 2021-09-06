import { Form, Input, Button } from 'antd';
import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import { useSelector} from 'react-redux';

import useInput from '../hooks/useInput';


const CommentForm = ({ post }) => {
     const id = useSelector((state) => state.user.me?.id);
    const [commentText, onChangeCommentText] = useInput('');
    const onSubmitComment = useCallback(() => { 
        console.log(post.id, commentText); //게시글 아이디 밑에 댓글을 달 예정이라
    }, [commentText]);
    return (
        <Form onFinish ={onSubmitComment}>
            <Form.Item style={{ position: 'relative', margin :0 }}>
                <Input.TextArea valye={commentText} onChange={onChangeCommentText} rows={4}/>
                <Button style = {{ position : 'absolute', right : 0, bottom : -40 }}type="primary" htmlType="submit">삐약</Button>
            </Form.Item>
        </Form>
    );
};

CommentForm.propTypes ={
    post : PropTypes.object.isRequired,
};

export default CommentForm;