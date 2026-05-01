import React from 'react';
import Header from './Header';
import BlogList from './BlogList';
import Footer from './Footer';

export default function BlogListPage() {
  return (
    <>
      <Header />
      <main>
        <BlogList />
      </main>
      <Footer />
    </>
  );
}
