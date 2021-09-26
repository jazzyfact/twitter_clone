import React,{ useCallback,  useRef, useEffect, useState} from 'react'
import { Form, Input, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux';


import { addPost } from '../reducers/post';
import useInput from '../hooks/useInput';


const PostForm = () =>{
    const dispatch = useDispatch();
    const [text, onChangeText , setText] = useInput('');
    const { imagePaths, addPostLoading, addPostDone } = useSelector((state) => state.post);
 
  
  
    //메세지 보내고 초기화
    useEffect(() => {
        if (addPostDone) {
          setText('');
        }
      }, [addPostDone]);

 
    const onSubmit = useCallback(() => {
        dispatch(addPost(text));
    }, [text]);

    const imageInput = useRef();
    const onClickImageUpload = useCallback(() =>{
        imageInput.current.click();
    },[imageInput.current]);
    return(
        <Form style={{ margin: '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="어떤 신기한 일이 있었나요"
            />
           <div>
               {/* ref 실제 DOM에 접근하기 위해 */}
               <input type="file" multiple hidden  ref={imageInput}/>
               <Button onClick={onClickImageUpload}>이미지 업로드</Button>
               <Button type="primary" style={{float : 'right'}} htmlType ="submit">짹짹</Button>
           </div>
           <div>
               {imagePaths.map((v) => (
                    <div key={v} style={{ display : 'inline-block'}}>
                       <img src={v} style={{ width : '200px' }} alt = {v} />
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
               ))}
           </div>
        </Form>
    )
}

export default PostForm;