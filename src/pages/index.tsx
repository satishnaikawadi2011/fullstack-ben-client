// import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { Navbar } from '../components/Navbar';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import { usePostsQuery } from '../generated/graphql';

const Index = () => {
	const [
		{ data }
	] = usePostsQuery();
	return (
		<div>
			<Navbar />
			{/* <DarkModeSwitch /> */}
			<h1>Hello World</h1>
			{data &&
				data.posts.map((post) => {
					return <p key={post.id}>{post.title}</p>;
				})}
		</div>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
