import React, { useState, useEffect } from 'react'
import styles from '../PostList/PostList.module.css'
import axios from 'axios'
import moment from 'moment'
import AddBlog from '../AddBlog/AddBlog'
import { useHistory } from 'react-router-dom'

const PostDetails = () => {
  const { postBox, dummyImg, inputBox, parentDiv } = styles
  const [getResponse, setResponse] = useState()
  const [showEdit, setShowEdit] = useState(false)
  const [comment, setComment] = useState('')
  const [getComments, setComments] = useState()
  const Detailsurl = new URL(window.location.href)
  const postId = Detailsurl.searchParams.get('postId')

  //get post details based on ID
  useEffect(() => {
    axios
      .get(`https://60334e6aa223790017ad019e.mockapi.io/api/v1/posts/${postId}`)
      .then((res) => {
        setResponse(res?.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [postId])

  //add new comment
  const addComment = (e, postId) => {
    e.preventDefault()
    const body = {
      commentBody: comment,
    }
    axios
      .post(
        `https://60334e6aa223790017ad019e.mockapi.io/api/v1/posts/${postId}/comments`,
        body,
      )
      .then((res) => {
        window.location.reload(false)
      })
      .catch((error) => {})
  }

  //delete any comment
  const deleteComment = (e, postId, commentId) => {
    e.preventDefault()
    axios
      .delete(
        `https://60334e6aa223790017ad019e.mockapi.io/api/v1/posts/${postId}/comments/${commentId}`,
      )
      .then((res) => {
        // window.location.reload(false)
      })
      .catch((error) => {})
  }

  //get all comments
  useEffect(() => {
    axios
      .get(
        `https://60334e6aa223790017ad019e.mockapi.io/api/v1/posts/${postId}/comments`,
      )
      .then((res) => {
        setComments(res?.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [postId])
  let history = useHistory()
  function handleClick() {
    history.push(`/`)
  }
  return (
    <div className={` ${parentDiv} mx-auto`}>
      <div className="row">
        <button class="btn" onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
          <span className="px-2">Back</span>
        </button>
      </div>
      {showEdit && (
        <AddBlog
          setShowEdit={setShowEdit}
          showEdit={showEdit}
          postId={postId}
        />
      )}

      <div className={`${postBox} my-4 `}>
        <div className={`${dummyImg}`} style={{ overflow: 'hidden' }}>
          <img src={getResponse?.imageUrl} alt="Img" />
        </div>
        <div className="m-4">
          <h2>{getResponse?.title}</h2>
          <p>
            Created:
            {moment(getResponse?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
          </p>
          <p>Last Updated: {getResponse?.updatedAt}</p>
          <p>{getResponse?.description}</p>
          <div className="d-flex">
            <div className="">
              <p className="">
                <strong>{getComments?.count} comments</strong>
              </p>
            </div>
            {getResponse?.userId === '73' && (
              <div className="d-flex ml-auto">
                <button
                  className="btn px-4"
                  onClick={() => {
                    setShowEdit(true)
                    window.scrollTo(0, 0)
                  }}
                >
                  <strong> Edit</strong>
                </button>
                <button className="btn px-2">
                  <strong> Delete</strong>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row mx-1">
        <textarea
          type="text"
          name="comments"
          className={`w-100 rounded ${inputBox} mt-3 px-2`}
          style={{ minHeight: '100px' }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="btn px-4 ml-auto"
          onClick={(e) => addComment(e, getResponse?.id)}
        >
          <strong> Comment</strong>
        </button>
      </div>
      <div className="my-2">
        {getComments?.items?.length ? (
          getComments?.items?.map((each, i) => {
            return (
              <div key={i} className="my-4">
                <p>{each?.commentBody}</p>
                <div className="d-flex">
                  <button
                    onClick={(e) => deleteComment(e, each?.postId, each?.id)}
                    className="btn pr-auto"
                    style={{ textAlign: 'left', paddingLeft: '0px' }}
                  >
                    <strong> Delete</strong>
                  </button>
                  <p className="ml-auto" style={{ fontWeight: '500' }}>
                    Created:
                    {moment(each?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                  </p>
                </div>
              </div>
            )
          })
        ) : (
          <p className="text-info">No comments</p>
        )}
      </div>
    </div>
  )
}
export default PostDetails
