import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import styles from '../PostList/PostList.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AddBlog({ setShow, showEdit, setShowEdit, postId }) {
  const { postBox, inputBox } = styles
  const [imageUrl, setImageUrl] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  //add new post
  const addPost = (e) => {
    e.preventDefault()
    const postData = {
      imageUrl,
      title,
      description,
    }
    axios
      .post(
        `https://60334e6aa223790017ad019e.mockapi.io/api/v1/posts`,
        postData,
      )
      .then((res) => {
        toast?.success('Post Added Successfully!')
        setShow(false)
        setTimeout(() => {
          window.location.reload(false)
        }, 1000)
      })
      .catch((error) => {
        setShow(false)
        console.log(error)
      })
  }

  //update existing post
  const updatePost = (e) => {
    e.preventDefault()
    const udateData = {
      imageUrl,
      title,
      description,
    }
    axios
      .put(
        `https://60334e6aa223790017ad019e.mockapi.io/api/v1/posts/${'73'}`,
        udateData,
      )
      .then((res) => {
        toast?.success('Post Updated Successfully!')
        setShowEdit(false)
        setTimeout(() => {
          window.location.reload(false)
        }, 1000)
      })
      .catch((error) => {
        console.log(error)
        setShowEdit(false)
      })
  }

  //get values for editing post
  useEffect(() => {
    axios
      .get(`https://60334e6aa223790017ad019e.mockapi.io/api/v1/posts/${postId}`)
      .then((res) => {
        setImageUrl(res?.data?.imageUrl)
        setTitle(res?.data?.title)
        setDescription(res?.data?.description)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [postId])

  return (
    <Fragment>
      <ToastContainer />
      <div className={`${postBox}`}>
        <form>
          <div className="mx-4">
            <input
              type="text"
              name="blogUrl"
              className={`w-100 ${inputBox} px-2`}
              value={imageUrl}
              placeholder={'Image URL'}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <input
              type="text"
              name="title"
              className={`w-100 ${inputBox} mt-3 px-2`}
              value={title}
              placeholder={'Title'}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              type="text"
              name="description"
              className={`w-100 ${inputBox} mt-3 px-2 py-2`}
              style={{ minHeight: '100px' }}
              value={description}
              placeholder={'Description'}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="d-flex">
              {showEdit ? (
                <React.Fragment>
                  <button
                    className="btn ml-auto"
                    type="submit"
                    onClick={updatePost}
                  >
                    <strong>Update</strong>
                  </button>
                  <button
                    className="btn "
                    onClick={() => {
                      setShowEdit(false)
                    }}
                  >
                    <strong>Cancel</strong>
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button
                    className="btn ml-auto"
                    type="submit"
                    onClick={addPost}
                  >
                    <strong>Add</strong>
                  </button>

                  <button
                    className="btn "
                    onClick={() => {
                      setShow(false)
                    }}
                  >
                    <strong>Cancel</strong>
                  </button>
                </React.Fragment>
              )}
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  )
}
export default AddBlog
