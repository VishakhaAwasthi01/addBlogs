import React, { useState, useEffect, Fragment } from 'react'
import styles from './PostList.module.css'
import axios from 'axios'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import AddBlog from '../AddBlog/AddBlog'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function PostList() {
  const { postBox, dummyImg, cursorClass } = styles
  const [showEdit, setShowEdit] = useState(false)
  const [postData, setPostData] = useState([])
  const [postId, setPostId] = useState('')
  let history = useHistory()
  function handleClick(postId) {
    history.push(`/post?postId=${postId}`)
  }

  //get list of posts
  useEffect(() => {
    axios
      .get(
        `https://60334e6aa223790017ad019e.mockapi.io/api/v1/posts?sortBy=createdAt&order=desc`,
      )
      .then((res) => {
        setPostData(res?.data?.items)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  //delete post function
  const deletePost = (e, postId) => {
    e.preventDefault()
    axios
      .delete(
        `https://60334e6aa223790017ad019e.mockapi.io/api/v1/posts/${postId}`,
      )
      .then((res) => {
        toast?.error('Post Deleted!')
        setTimeout(() => {
          window.location.reload(false)
        }, 1000)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Fragment>
      <ToastContainer />
      {showEdit && (
        <AddBlog
          setShowEdit={setShowEdit}
          showEdit={showEdit}
          postId={postId}
        />
      )}
      {postData?.length ? (
        postData.map((each, index) => {
          return (
            <div className={`${postBox} my-4 `} key={index}>
              <div
                className={`${dummyImg} ${cursorClass}`}
                onClick={() => handleClick(each?.id)}
                style={{ overflow: 'hidden' }}
              >
                <img src={each?.imageUrl} alt="Img" />
              </div>
              <div className="m-4 ">
                <h2
                  className={`${cursorClass}`}
                  onClick={() => handleClick(each?.id)}
                >
                  {each?.title}
                </h2>
                <p>
                  Created:
                  {moment(each?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </p>
                <p>
                  Last Updated:
                  {moment(each?.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                </p>
                <p>{each?.description}</p>
                <div className="d-lg-flex">
                  <div className="">
                    <p
                      className={`${cursorClass}`}
                      onClick={() => handleClick(each?.id)}
                    >
                      <strong>comments</strong>
                    </p>
                  </div>
                  {each?.userId === '73' && (
                    <div className="d-flex flex-wrap ml-auto">
                      <button
                        type="submit"
                        className="btn px-4"
                        onClick={() => {
                          setShowEdit(true)
                          setPostId(each?.id)
                          window.scrollTo(0, 0)
                        }}
                      >
                        <strong> Edit</strong>
                      </button>
                      <button
                        className="btn px-2"
                        onClick={(e) =>
                          window.confirm(
                            'Are you sure you wish to delete this post?',
                          ) && deletePost(e, each?.id)
                        }
                      >
                        <strong> Delete</strong>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <p className="text-success m-auto">Loading posts..</p>
      )}
    </Fragment>
  )
}
export default PostList
