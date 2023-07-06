import React, { useEffect, useState } from 'react'
import { useAuth } from '../../helpers/AuthContext'
import styles from '../styleModules/HomeReelsBar.module.css'

function HomeReelsBar() {
  const { authState, BASE_URL } = useAuth()
  const [reelsList, setReelsList] = useState([])
  const [reelsByUser, setReelsByUser] = useState([])
  const [watched, setwatched] = useState(false)

  useEffect(() => {
    if (authState.uid) {
      getReelsList()
    }
  }, [authState])

  function getReelsList() {
    const url = `${BASE_URL}/reels/home-reels/${authState.uid}`

    fetch(url, {
      method: 'get',
      headers: {
        user: localStorage.getItem('user') || '',
      },
    })
      .then((r) => r.json())
      .then((rData) => {
        console.log(url, rData)
        setReelsList(rData.reels)
        setReelsByUser(rData.reelsByUser)
      })
  }

  return (
    <>
      <div className={styles.reelsBar + ' reelsBar'}>
        {reelsByUser.map((reels) => {
          return (
            <div
              key={reels.userid}
              className={
                styles.reel + ' reel ' + `${watched ? styles.watched : ''}`
              }
            >
              <div className={styles.outimgBox2 + ' outimgBox2'}>
                <div className={styles.outimgBox1 + ' outimgBox1'}>
                  <div className={styles.imgBox + ' imgBox'}>
                    <img
                      src={`users/${reels.image || 'user.png'}`}
                      alt="reels-user-profileimage"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.username + ' username text-h65'}>
                {reels.username}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default HomeReelsBar
