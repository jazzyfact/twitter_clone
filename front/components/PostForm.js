import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from '../reducers/post';
import useInput from '../hooks/useInput';

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { imagePaths, addPostLoading, addPostDone } = useSelector((state) => state.post);

  const imageInput = useRef();

//메세지 보내고 초기화
  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmitForm = useCallback(() => {
    dispatch({
      type: ADD_POST_REQUEST,
      data: text,
    });
  }, [text]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log('imgaes', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type : UPLOAD_IMAGES_REQUEST,
      data : imageFormData,
    })
  });


  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmitForm}>
      <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 있었나요?" value={text} onChange={onChangeText} />
      <div>
         {/* ref 실제 DOM에 접근하기 위해 */}
        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={addPostLoading}>짹짹</Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;