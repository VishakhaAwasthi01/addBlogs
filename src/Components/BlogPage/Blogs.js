import React, { useState } from 'react'
import PostList from '../PostList/PostList'
import styles from './BlogPage.module.css'

import AddBlog from '../AddBlog/AddBlog'
function Blogs() {
  const { addBtn, parentDiv } = styles
  const [show, setShow] = useState(false)
  return (
    <div className="container">
      <div className={` ${parentDiv} mx-auto`}>
        <div className="row mt-4">
          <button
            className={`ml-auto btn ${addBtn}`}
            onClick={() => {
              setShow(true)
            }}
          >
            <strong>+ NEW POST</strong>
          </button>
        </div>
        <div className=" mt-4">
          {show && <AddBlog setShow={setShow} />}
          <PostList />
        </div>
      </div>
    </div>
  )
}
export default Blogs
