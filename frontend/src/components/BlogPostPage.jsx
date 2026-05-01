import React from 'react';
import Header from './Header';
import BlogPost from './BlogPost';
import Footer from './Footer';

export default function BlogPostPage() {
  return (
    <>
      <Header />
      <main>
        <BlogPost />
      </main>
      <Footer />
    </>
  );
}
