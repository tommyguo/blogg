import React from 'react';
import PostPreview from './PostPreview';

import Image from './Image';

class PostsPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      posts: null,
      error: false,
    };
  }

  componentDidMount() {
    fetch(`/api/posts`, {
      headers: {
        'Accept': 'application/json',
      },
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        if (res && res.length > 0) {
          this.setState({
            isLoaded: true,
            posts: res
          });
        } else {
          throw Error;
        }
      })
      .catch(() => {
        this.setState({
          isLoaded: true,
          error: true,
        });
      });
  }

  getPosts() {
    return this.state.posts.map((post) => {
      return (
        <PostPreview 
          key={post.id}
          slug={post.slug}
          title={post.title}
          image={<Image className='previewImage' 
          src={post.banner} />} 
        />
      );
      
    });
  }

  render() {
    if (this.state.isLoaded) {
      if (!this.state.error) {
        return (
          <div id='postsPreview'>
            {this.getPosts()}
          </div>
        );
      } else {
        return (
          <div id='postsPreview'>
              <h1>Posts Not Found</h1>
          </div>
        );
      }
    } else {
      return null;
    }
  }
}

export default PostsPreview;