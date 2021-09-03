import React from 'react';
import { useSelector } from 'react-redux';


import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
    const { isLoggedIn } = useSelector((state) => state.user);
    const { mainPosts } = useSelector((state) => state.post);
    return (
        <AppLayout>
            {isLoggedIn && <PostForm/>}
            {/* key는 index 하면 안됨
            안티패텬(피해야하는 것)
            게시글이 지워질 가능성이 있는 경우에는 index 사용하면 안됨,
            순서가 달라지거나 중간에 추가 될 때
            하지만 데이터가 바뀌지 않을 때에는 index 사용 가능 */}
            {mainPosts.map((post) => <PostCard key={post.id} post={post}/> )}
        </AppLayout>
    );
}
export default Home;